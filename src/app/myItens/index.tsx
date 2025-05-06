// src/app/myItens/index.tsx
import React, { useEffect, useState } from 'react';
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
} from '../../config/database';

export default function MyItens() {
  const router = useRouter();
  // Itens do usuário logado
  const [items, setItems] = useState<Item[]>([]);

  // Estado do modal de confirmação
  const [confirmModal, setConfirmModal] = useState<{
    visible: boolean;
    type: 'edit' | 'delete';
    itemId: string | null;
  }>({ visible: false, type: 'delete', itemId: null });

  // Carrega itens do AsyncStorage
  const loadItems = async () => {
    const userItems = await getItemsByUser();
    setItems(userItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Abre o modal para confirmar edição ou exclusão
  const openConfirm = (type: 'edit' | 'delete', itemId: string) => {
    setConfirmModal({ visible: true, type, itemId });
  };

  // Fecha o modal de confirmação
  const closeConfirm = () => {
    setConfirmModal({ visible: false, type: 'delete', itemId: null });
  };

  // Executa ação ao confirmar
  const handleConfirm = async () => {
    const { type, itemId } = confirmModal;
    if (!itemId) return closeConfirm();

    if (type === 'delete') {
      await removeItemById(itemId);
      await loadItems();
    } else {
      router.push(`/editItens?id=${itemId}`);
    }
    closeConfirm();
  };

  // Botão voltar para Home
  const handleBack = () => {
    router.push('/home');
  };

  // Estatísticas para bottom bar
  const total    = items.length;
  const abertos  = items.filter(i => !i.isNegotiated).length;
  const fechados = items.filter(i => i.isNegotiated).length;

  return (
    <>
      {/* Top Bar criativa */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.topBarButton}>
          <Text style={styles.topBarIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Meus Itens</Text>
        <View style={styles.topBarSpacing} />
      </View>

      {/* Lista de cards */}
      <FlatList
        contentContainerStyle={styles.container}
        data={items}
        keyExtractor={i => i.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            Você ainda não cadastrou nenhum item.
          </Text>
        }
        renderItem={({ item }) => (
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
                  item.isNegotiated ? styles.statusClosed : styles.statusOpen,
                ]}
              >
                {item.isNegotiated ? 'Negociado' : 'Aberto'}
              </Text>
            </View>

            {/* Ações: editar e excluir */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => openConfirm('edit', item.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openConfirm('delete', item.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
              : 'Confirmar Edição'}
          </Text>
          <Text style={styles.confirmMessage}>
            {confirmModal.type === 'delete'
              ? 'Deseja realmente excluir este item?'
              : 'Deseja editar este item agora?'}
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
          Total: {total}  •  Abertos: {abertos}  •  Fechados: {fechados}
        </Text>
      </View>
    </>
  );
}
