/* src/config/database.ts */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas para armazenamento
const USERS_KEY = 'users';
const ITEMS_KEY = 'items';
const CURRENT_USER_KEY = 'current_user';

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
}

/**
 * Salva um novo item no AsyncStorage.
 */
export async function saveItem(item: Item): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(ITEMS_KEY);
    const items: Item[] = json ? JSON.parse(json) : [];
    items.push(item);
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Erro ao salvar item:', error);
    throw error;
  }
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

/**
 * Retorna apenas os itens cadastrados por outros usuários.
 */
export async function getItemsByOthers(): Promise<Item[]> {
  try {
    const all = await getItems();
    const currentEmail = await getCurrentUser();
    return all.filter(item => item.userEmail !== currentEmail);
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

