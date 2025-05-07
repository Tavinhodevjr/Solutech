// src/config/metrics.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from './database';

// Chaves de armazenamento
const USERS_KEY = 'users';
const ITEMS_KEY = 'items';

/**
 * Retorna o total de usuários cadastrados.
 */
export async function getTotalUsers(): Promise<number> {
  const json = await AsyncStorage.getItem(USERS_KEY);
  const users = json ? JSON.parse(json) : [];
  return users.length;
}

/**
 * Retorna o total de itens cadastrados.
 */
export async function getTotalItems(): Promise<number> {
  const json = await AsyncStorage.getItem(ITEMS_KEY);
  const items: Item[] = json ? JSON.parse(json) : [];
  return items.length;
}

/**
 * Retorna a contagem de itens por status (aberto vs negociado).
 */
export async function getItemsCountByStatus(): Promise<{
  open: number;
  negotiated: number;
}> {
  const json = await AsyncStorage.getItem(ITEMS_KEY);
  const items: Item[] = json ? JSON.parse(json) : [];
  const open = items.filter(i => !i.isNegotiated).length;
  const negotiated = items.filter(i => i.isNegotiated).length;
  return { open, negotiated };
}

/**
 * Retorna a contagem de itens agrupados por tipo de negociação.
 */
export async function getItemsCountByNegotiationType(): Promise<Record<string, number>> {
  const json = await AsyncStorage.getItem(ITEMS_KEY);
  const items: Item[] = json ? JSON.parse(json) : [];
  const counts: Record<string, number> = {};
  items.forEach(i => {
    counts[i.tipoNegociacao] = (counts[i.tipoNegociacao] || 0) + 1;
  });
  return counts;
}
