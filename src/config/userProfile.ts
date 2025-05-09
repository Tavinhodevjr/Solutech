import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from './database';
import { getUsers } from './database';

const BASE_KEY = 'user_profile';  // chave base

export interface UserProfile {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
}

/** Gera a key única para o usuário logado */
async function getStorageKey(): Promise<string | null> {
  const email = await getCurrentUser();
  if (!email) return null;
  return `${BASE_KEY}_${email}`;
}

/**
 * Retorna o perfil salvo para o usuário atual.
 * Se não existir, carrega os dados originais do cadastro.
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const key = await getStorageKey();
    if (key) {
      const json = await AsyncStorage.getItem(key);
      if (json) return JSON.parse(json);
    }
    // fallback: buscar nos usuários cadastrados
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
 * Salva/atualiza o perfil editado **somente** para o usuário atual.
 */
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const key = await getStorageKey();
    if (!key) throw new Error('Usuário não autenticado');
    await AsyncStorage.setItem(key, JSON.stringify(profile));
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw error;
  }
}
