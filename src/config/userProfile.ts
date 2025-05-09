import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from './database';
import { getUsers } from './database';

/**
 * Chave usada para armazenar o perfil editado.
 */
const USER_PROFILE_KEY = 'user_profile';

/**
 * Interface do perfil do usuário.
 */
export interface UserProfile {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
}

/**
 * Retorna o perfil salvo. 
 * Se não existir, carrega os dados do cadastro original.
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const json = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (json) return JSON.parse(json);
    // fallback para dados originais
    const email = await getCurrentUser();
    if (!email) return null;
    const users = await getUsers();
    const u = users.find(u => u.email === email);
    if (!u) return null;
    return {
      nome: u.nome,
      email: u.email,
      empresa: u.empresa,
      telefone: u.telefone,
    };
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    return null;
  }
}

/**
 * Salva o perfil editado no AsyncStorage.
 */
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw error;
  }
}
