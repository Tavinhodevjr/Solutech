/* src/config/database.ts */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave usada para armazenar a lista de usuários
const USERS_KEY = 'users';

/**
 * Salva um novo usuário no AsyncStorage.
 * @param user Objeto contendo os dados do usuário a serem cadastrados.
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
 * Verifica se as credenciais fornecidas correspondem a um usuário cadastrado.
 * @param email E-mail informado pelo usuário.
 * @param senha Senha informada pelo usuário.
 * @returns true se encontrar usuário válido, false caso contrário.
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
