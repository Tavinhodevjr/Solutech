import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import {
  Item,
  getItemsByUser,
  removeItemById,
  finalizeNegotiation,
} from '../../config/database';

export default function MyItens() {
  const router = useRouter();

  // Todos os itens do usuário e itens filtrados conforme status
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // Estado de filtro de status
  const [filterStatus, setFilterStatus] = useState<'Todos' | 'Aberto' | 'Interessado' | 'Negociado'>('Todos');
  const [filterModal, setFilterModal] = useState(false);

  // Estado do modal de confirmação
  const [confirmModal, setConfirmModal] = useState<{
    visible: boolean;
    type: 'edit' | 'delete' | 'finalize';
    itemId: string | null;
  }>({ visible: false, type: 'delete', itemId: null });

  // Carrega todos os itens e aplica filtro
  const loadItems = useCallback(async () => {
    const userItems = await getItemsByUser();
    setItems(userItems);
    applyFilter(userItems, filterStatus);
  }, [filterStatus]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Filtra a lista por status
  const applyFilter = (list: Item[], status: typeof filterStatus) => {
    let data = list;
    if (status === 'Aberto') {
      data = list.filter(i => !i.isNegotiated);
    } else if (status === 'Interessado') {
      data = list.filter(i => i.negotiationStatus === 'aguardando');
    } else if (status === 'Negociado') {
      data = list.filter(i => i.negotiationStatus === 'finalizado');
    }
    setFilteredItems(data);
  };

  // Abre modal de filtro
  const openFilter = () => setFilterModal(true);
  const selectFilter = (status: typeof filterStatus) => {
    setFilterStatus(status);
    applyFilter(items, status);
    setFilterModal(false);
  };

  // Abre o modal para confirmar ação
  const openConfirm = (type: 'edit' | 'delete' | 'finalize', itemId: string) => {
    setConfirmModal({ visible: true, type, itemId });
  };
  const closeConfirm = () => {
    setConfirmModal({ visible: false, type: 'delete', itemId: null });
  };

  // Executa ação após confirmação
  const handleConfirm = async () => {
    const { type, itemId } = confirmModal;
    if (!itemId) return closeConfirm();

    if (type === 'delete') {
      await removeItemById(itemId);
    } else if (type === 'edit') {
      router.push(`/editItens?id=${itemId}`);
    } else if (type === 'finalize') {
      await finalizeNegotiation(itemId);
    }

    closeConfirm();
    loadItems();
  };

  // Volta para Home
  const handleBack = () => router.push('/home');

  // Estatísticas para a bottom bar
  const total    = items.length;
  const abertos  = items.filter(i => !i.isNegotiated).length;
  const aguardam = items.filter(i => i.negotiationStatus === 'aguardando').length;
  const fechados = items.filter(i => i.negotiationStatus === 'finalizado').length;

  return (
    <>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.topBarButton}>
          <Text style={styles.topBarIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Meus Itens</Text>
        <TouchableOpacity onPress={openFilter} style={styles.topBarButton}>
          <Text style={styles.topBarIcon}>{filterStatus}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de cards */}
      <FlatList
        contentContainerStyle={styles.container}
        data={filteredItems}
        keyExtractor={i => i.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            Você ainda não cadastrou nenhum item.
          </Text>
        }
        renderItem={({ item }) => {
          const isOpen = !item.isNegotiated && !item.negotiationStatus;
          const isPending = item.negotiationStatus === 'aguardando';
          const isClosed = item.negotiationStatus === 'finalizado';

          return (
            <View style={styles.card}>
              {/* Conteúdo do card */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Qtd: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unid.: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Neg.: {item.tipoNegociacao}</Text>
                {/* Badge de status */}
                <Text
                  style={[
                    styles.cardStatus,
                    isOpen
                      ? styles.statusOpen
                      : isPending
                        ? styles.statusPending
                        : styles.statusClosed,
                  ]}
                >
                  {isOpen
                    ? 'Aberto'
                    : isPending
                      ? 'Usuário interessado'
                      : 'Negociado'}
                </Text>
              </View>

              {/* Ações */}
              <View style={styles.cardActions}>
                {/* Editar */}
                <TouchableOpacity
                  disabled={!isOpen}
                  onPress={() => openConfirm('edit', item.id)}
                  style={[
                    styles.actionButton,
                    !isOpen && styles.actionButtonDisabled,
                  ]}
                >
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                {/* Excluir */}
                <TouchableOpacity
                  disabled={!isOpen}
                  onPress={() => openConfirm('delete', item.id)}
                  style={[
                    styles.actionButton,
                    !isOpen && styles.actionButtonDisabled,
                  ]}
                >
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
                {/* Finalizar */}
                <TouchableOpacity
                  disabled={!isPending}
                  onPress={() => openConfirm('finalize', item.id)}
                  style={[
                    styles.actionButton,
                    !isPending && styles.actionButtonDisabled,
                  ]}
                >
                  <Text style={styles.actionText}>✅</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Modal de confirmação */}
      <Modal
        visible={confirmModal.visible}
        transparent
        animationType="fade"
        onRequestClose={closeConfirm}
      >
        <TouchableWithoutFeedback onPress={closeConfirm}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.confirmModal}>
          <Text style={styles.confirmTitle}>
            {confirmModal.type === 'delete'
              ? 'Confirmar Exclusão'
              : confirmModal.type === 'edit'
                ? 'Confirmar Edição'
                : 'Confirmar Negociação'}
          </Text>
          <Text style={styles.confirmMessage}>
            {confirmModal.type === 'delete'
              ? 'Deseja realmente excluir este item?'
              : confirmModal.type === 'edit'
                ? 'Deseja editar este item agora?'
                : 'Deseja finalizar esta negociação?'}
          </Text>
          <View style={styles.confirmButtons}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.cancelButton]}
              onPress={closeConfirm}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, styles.confirmButtonMain]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Bar com estatísticas */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>
          Total: {total}  •  Abertos: {abertos}  •  Interessados: {aguardam}  •  Fechados: {fechados}
        </Text>
      </View>
    </>
  );
}
