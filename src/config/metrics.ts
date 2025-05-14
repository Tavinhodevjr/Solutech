import {
  getItemsByUser,
  getNegotiationsByUser,
} from './database';

/**
 * Total de itens cadastrados pelo usuário logado.
 */
export async function getTotalItemsByUser(): Promise<number> {
  const items = await getItemsByUser();
  return items.length;
}

/**
 * Total de negociações realizadas pelo usuário logado.
 */
export async function getTotalNegotiationsByUser(): Promise<number> {
  const deals = await getNegotiationsByUser();
  return deals.length;
}

/**
 * Conta quantos itens do usuário estão abertos, aguardando confirmação e finalizados.
 */
export async function getItemsCountByStatus(): Promise<{
  open: number;
  pending: number;
  finalized: number;
}> {
  const items = await getItemsByUser();
  const open = items.filter(i => !i.isNegotiated).length;
  const pending = items.filter(i => i.negotiationStatus === 'aguardando').length;
  const finalized = items.filter(i => i.negotiationStatus === 'finalizado').length;
  return { open, pending, finalized };
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
