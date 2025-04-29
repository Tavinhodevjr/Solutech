/* src/config/database.ts */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas para armazenamento
const USERS_KEY = 'users';
const ITEMS_KEY = 'items';
const CURRENT_USER_KEY = 'current_user';
const NEGOTIATIONS_KEY = 'negotiations';

/**
 * Salva um novo usuário no AsyncStorage.
 */
export async function saveUser(user: {
  nome: string;
  email: string;
  senha: string;
  empresa: string;
  telefone: string;
}): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    const users = json ? JSON.parse(json) : [];
    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
}

/**
 * Retorna todos os usuários cadastrados.
 */
export async function getUsers(): Promise<Array<{ nome: string; email: string; senha: string; empresa: string; telefone: string }>> {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
}

/**
 * Autentica usuário por e-mail e senha.
 */
export async function authenticateUser(email: string, senha: string): Promise<boolean> {
  try {
    const users = await getUsers();
    return users.some(u => u.email === email && u.senha === senha);
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
}

/**
 * Define o usuário atualmente logado.
 */
export async function setCurrentUser(email: string): Promise<void> {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, email);
  } catch (error) {
    console.error('Erro ao definir usuário atual:', error);
  }
}

/**
 * Retorna o e-mail do usuário logado.
 */
export async function getCurrentUser(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
}

/**
 * Remove a sessão do usuário logado.
 */
export async function removeCurrentUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Erro ao remover usuário atual:', error);
  }
}

/**
 * Interface do item cadastrado.
 */
export interface Item {
  id: string;
  userEmail: string;
  tipoResiduo: string;
  unidadeMedida: string;
  quantidade: string;
  descricao: string;
  tipoNegociacao: string;
  isNegotiated: boolean;            
  negotiationUserEmail?: string;  
}

/** Salva um novo item, inicializando como não negociado */
export async function saveItem(item: Omit<Item, 'isNegotiated' | 'negotiationUserEmail'>): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    const items: Item[] = json ? JSON.parse(json) : [];
    items.push({ ...item, isNegotiated: false });
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Erro ao salvar item:', error);
    throw error;
  }
}

/** Marca um item como negociado pelo usuário atual */
export async function updateItemStatus(id: string, negotiationUserEmail: string): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    const items: Item[] = json ? JSON.parse(json) : [];
    const updated = items.map(item =>
      item.id === id
        ? { ...item, isNegotiated: true, negotiationUserEmail }
        : item
    );
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Erro ao atualizar status do item:', error);
    throw error;
  }
}

/** Reverte um item à condição “aberto” (cancelar negociação) */
export async function revertItemStatus(id: string): Promise<void> {
  const json = await AsyncStorage.getItem(ITEMS_KEY);
  const items: Item[] = json ? JSON.parse(json) : [];
  const updated = items.map(item =>
    item.id === id
      ? { ...item, isNegotiated: false, negotiationUserEmail: undefined }
      : item
  );
  await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(updated));
}

/**
 * Retorna todos os itens cadastrados.
 */
export async function getItems(): Promise<Item[]> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao obter itens:', error);
    return [];
  }
}

/**
 * Retorna apenas os itens cadastrados pelo usuário logado.
 */
export async function getItemsByUser(): Promise<Item[]> {
  try {
    const all = await getItems();
    const currentEmail = await getCurrentUser();
    return all.filter(item => item.userEmail === currentEmail);
  } catch (error) {
    console.error('Erro ao filtrar itens do usuário:', error);
    return [];
  }
}

/** Itens de outros usuários e ainda NÃO negociados */
export async function getItemsByOthers(): Promise<Item[]> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    const all: Item[] = json ? JSON.parse(json) : [];
    const current = await getCurrentUser();
    return all.filter(i => i.userEmail !== current && !i.isNegotiated);
  } catch (error) {
    console.error('Erro ao filtrar itens de outros usuários:', error);
    return [];
  }
}

/**
 * Remove um item dado seu ID.
 */
export async function removeItemById(id: string): Promise<void> {
  try {
    const all = await getItems();
    const filtered = all.filter(item => item.id !== id);
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover item:', error);
    throw error;
  }
}

/** Salva uma negociação/interesse */
export async function saveNegotiation(item: Item): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(NEGOTIATIONS_KEY);
    const deals: Item[] = json ? JSON.parse(json) : [];
    deals.push(item);
    await AsyncStorage.setItem(NEGOTIATIONS_KEY, JSON.stringify(deals));
  } catch (error) {
    console.error('Erro ao salvar negociação:', error);
    throw error;
  }
}

/** Itens que o usuário atual negociou */
export async function getNegotiationsByUser(): Promise<Item[]> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    const all: Item[] = json ? JSON.parse(json) : [];
    const current = await getCurrentUser();
    return all.filter(i => i.negotiationUserEmail === current);
  } catch (error) {
    console.error('Erro ao obter negociações:', error);
    return [];
  }
}

/** Remove negociação por ID */
export async function removeNegotiationById(id: string): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(NEGOTIATIONS_KEY);
    const deals: Item[] = json ? JSON.parse(json) : [];
    const filtered = deals.filter(d => d.id !== id);
    await AsyncStorage.setItem(NEGOTIATIONS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover negociação:', error);
    throw error;
  }
}
