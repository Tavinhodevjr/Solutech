/* src/config/metrics.ts */
import {
  getItemsByUser,
  getNegotiationsByUser,
} from './database';

/**
 * Retorna o total de itens cadastrados pelo usuário logado.
 */
export async function getTotalItemsByUser(): Promise<number> {
  const items = await getItemsByUser();
  return items.length;
}

/**
 * Retorna o total de negociações realizadas pelo usuário logado.
 */
export async function getTotalNegotiationsByUser(): Promise<number> {
  const deals = await getNegotiationsByUser();
  return deals.length;
}

/**
 * Conta quantos itens do usuário estão abertos e quantos já foram negociados.
 */
export async function getItemsCountByStatus(): Promise<{ open: number; negotiated: number }> {
  const items = await getItemsByUser();
  const open = items.filter(i => !i.isNegotiated).length;
  const negotiated = items.filter(i => i.isNegotiated).length;
  return { open, negotiated };
}

/**
 * Agrupa a quantidade de itens por tipo de negociação (Doação, Venda, Troca).
 */
export async function getItemsCountByNegotiationType(): Promise<Record<string, number>> {
  const items = await getItemsByUser();
  const counts: Record<string, number> = {};
  items.forEach(i => {
    counts[i.tipoNegociacao] = (counts[i.tipoNegociacao] || 0) + 1;
  });
  return counts;
}
