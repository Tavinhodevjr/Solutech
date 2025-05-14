import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from './database';
import { getUsers } from './database';

const BASE_KEY = 'user_profile';
const USERS_KEY = 'users';

export interface UserProfile {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  avatarUri?: string;
}

async function getStorageKey(): Promise<string> {
  const email = await getCurrentUser();
  if (!email) throw new Error('Usuário não autenticado');
  return `${BASE_KEY}_${email}`;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const key = await getStorageKey();
    const json = await AsyncStorage.getItem(key);
    if (json) return JSON.parse(json);
    // fallback para dados originais
    const email = await getCurrentUser();
    if (!email) return null;
    const users = await getUsers();
    const u = users.find(u => u.email === email);
    if (!u) return null;
    return { nome: u.nome, email: u.email, empresa: u.empresa, telefone: u.telefone };
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    return null;
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const key = await getStorageKey();
    await AsyncStorage.setItem(key, JSON.stringify(profile));
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw error;
  }
}

/**
 * Atualiza senha do usuário no armazenamento de usuários.
 */
export async function changePassword(email: string, newPassword: string): Promise<void> {
  try {
    const json = await AsyncStorage.getItem(USERS_KEY);
    const users: Array<any> = json ? JSON.parse(json) : [];
    const updated = users.map(u =>
      u.email === email ? { ...u, senha: newPassword } : u
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    throw error;
  }
}
