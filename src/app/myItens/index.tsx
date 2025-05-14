import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import { styles } from './styles';
import {
  Item,
  getItemsByUser,
  removeItemById,
  finalizeNegotiation,
} from '../../config/database';
import { getUsers } from '../../config/database';

export default function MyItens() {
  const router = useRouter();

  // Estados principais
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');

  // Filtro de status
  const [filterStatus, setFilterStatus] = useState<'Todos' | 'Aberto' | 'Interessado' | 'Negociado'>('Todos');
  const [filterModal, setFilterModal] = useState(false);

  // Modal de confirmação
  const [confirmModal, setConfirmModal] = useState<{
    visible: boolean;
    type: 'edit' | 'delete' | 'finalize';
    itemId: string | null;
  }>({ visible: false, type: 'delete', itemId: null });

  // Modal de detalhes
  const [detailModal, setDetailModal] = useState<{
    visible: boolean;
    item?: Item;
    contact?: { nome: string; email: string; empresa: string; telefone: string };
  }>({ visible: false });

  // Estatísticas
  const [stats, setStats] = useState({ total: 0, abertos: 0, interessados: 0, negociados: 0 });

  // Carrega itens e aplica filtros
  const loadItems = useCallback(async () => {
    const userItems = await getItemsByUser();
    setItems(userItems);
    applyFilter(userItems, filterStatus, search);

    setStats({
      total: userItems.length,
      abertos: userItems.filter(i => !i.isNegotiated).length,
      interessados: userItems.filter(i => i.negotiationStatus === 'aguardando').length,
      negociados: userItems.filter(i => i.negotiationStatus === 'finalizado').length,
    });
  }, [filterStatus, search]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Filtra por status e busca
  const applyFilter = (list: Item[], status: typeof filterStatus, text: string) => {
    let data = list;
    if (status === 'Aberto') {
      data = data.filter(i => !i.isNegotiated);
    } else if (status === 'Interessado') {
      data = data.filter(i => i.negotiationStatus === 'aguardando');
    } else if (status === 'Negociado') {
      data = data.filter(i => i.negotiationStatus === 'finalizado');
    }
    if (text) {
      data = data.filter(i =>
        i.tipoResiduo.toLowerCase().includes(text.toLowerCase()) ||
        i.descricao.toLowerCase().includes(text.toLowerCase())
      );
    }
    setFilteredItems(data);
  };

  // Busca em tempo real
  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilter(items, filterStatus, text);
  };

  // Filtro de status
  const openFilter = () => setFilterModal(true);
  const selectFilter = (status: typeof filterStatus) => {
    setFilterStatus(status);
    applyFilter(items, status, search);
    setFilterModal(false);
  };

  // Confirmação de ações
  const openConfirm = (type: 'edit' | 'delete' | 'finalize', itemId: string) => {
    setConfirmModal({ visible: true, type, itemId });
  };
  const closeConfirm = () => {
    setConfirmModal({ visible: false, type: 'delete', itemId: null });
  };
  const handleConfirm = async () => {
    const { type, itemId } = confirmModal;
    if (!itemId) return closeConfirm();

    if (type === 'delete') {
      await removeItemById(itemId);
    } else if (type === 'edit') {
      router.push(`/editItens?id=${itemId}`);
    } else {
      await finalizeNegotiation(itemId);
    }

    closeConfirm();
    loadItems();
  };

  // Detalhes do item e contato
  const openDetail = async (item: Item) => {
    const users = await getUsers();
    const contactUser = users.find(u => u.email === item.negotiationUserEmail);
    setDetailModal({
      visible: true,
      item,
      contact: contactUser && {
        nome: contactUser.nome,
        email: contactUser.email,
        empresa: contactUser.empresa,
        telefone: contactUser.telefone,
      },
    });
  };
  const closeDetail = () => setDetailModal({ visible: false });

  // Envia e-mail ao cadastrante
  const sendEmail = async () => {
    if (!detailModal.contact || !detailModal.item) return;
    await MailComposer.composeAsync({
      recipients: [detailModal.contact.email],
      subject: `Interesse em ${detailModal.item.tipoResiduo}`,
      body: `Olá ${detailModal.contact.nome},\n\nEstou interessado no seu item "${detailModal.item.tipoResiduo}". Podemos conversar?\n\nObrigado.`,
    });
  };

  // Voltar home
  const handleBack = () => router.push('/home');

  return (
    <>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.topBarButton}>
          <Text style={styles.topBarIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Meus Itens</Text>
      </View>

      {/* Busca e Filtro */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
          <Text style={styles.filterButtonText}>{filterStatus}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar itens..."
          value={search}
          onChangeText={handleSearch}
        />
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
          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => openDetail(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Qtd: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unid.: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Neg.: {item.tipoNegociacao}</Text>
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
              </TouchableOpacity>
              <View style={styles.cardActions}>
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

      {/* Modal de filtro */}
      <Modal visible={filterModal} transparent animationType="fade" onRequestClose={() => setFilterModal(false)}>
        <TouchableWithoutFeedback onPress={() => setFilterModal(false)}>
          <View style={styles.modalOverlay}/>
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          {(['Todos','Aberto','Interessado','Negociado'] as const).map(s => (
            <TouchableOpacity key={s} style={styles.optionItem} onPress={() => selectFilter(s)}>
              <Text style={styles.optionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Modal de confirmação */}
      <Modal visible={confirmModal.visible} transparent animationType="fade" onRequestClose={closeConfirm}>
        <TouchableWithoutFeedback onPress={closeConfirm}>
          <View style={styles.modalOverlay}/>
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
            <TouchableOpacity style={[styles.confirmButton, styles.cancelButton]} onPress={closeConfirm}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, styles.confirmButtonMain]} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de detalhes */}
      <Modal
        visible={detailModal.visible}
        transparent
        animationType="fade"
        onRequestClose={closeDetail}
      >
        <TouchableWithoutFeedback onPress={closeDetail}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.detailModal}>
          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={closeDetail}>
              <Text style={styles.detailBack}>←</Text>
            </TouchableOpacity>
            <Text style={styles.detailTitle}>Detalhes</Text>
          </View>
          <ScrollView>
            <Text style={styles.detailLabel}>Item:</Text>
            <Text style={styles.detailText}>{detailModal.item?.tipoResiduo}</Text>
            <Text style={styles.detailLabel}>Descrição:</Text>
            <Text style={styles.detailText}>{detailModal.item?.descricao}</Text>
            <Text style={styles.detailLabel}>Quantidade:</Text>
            <Text style={styles.detailText}>{detailModal.item?.quantidade}</Text>
            <Text style={styles.detailLabel}>Unidade:</Text>
            <Text style={styles.detailText}>{detailModal.item?.unidadeMedida}</Text>
            <Text style={styles.detailLabel}>Negociação:</Text>
            <Text style={styles.detailText}>{detailModal.item?.tipoNegociacao}</Text>
            <View style={styles.divider}/>
            <Text style={styles.detailLabel}>Contato:</Text>
            <Text style={styles.detailText}>Nome: {detailModal.contact?.nome}</Text>
            <Text style={styles.detailText}>E-mail: {detailModal.contact?.email}</Text>
            <Text style={styles.detailText}>Empresa: {detailModal.contact?.empresa}</Text>
            <TouchableOpacity style={styles.emailButton} onPress={sendEmail}>
              <Text style={styles.emailButtonText}>Enviar E-mail</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Bottom Bar com carousel de stats */}
      <View style={styles.bottomBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navContainer}
        >
          <View style={styles.statButton}>
            <Text style={styles.statText}>Total: {stats.total}</Text>
          </View>
          <View style={styles.statButton}>
            <Text style={styles.statText}>Abertos: {stats.abertos}</Text>
          </View>
          <View style={styles.statButton}>
            <Text style={styles.statText}>Interessados: {stats.interessados}</Text>
          </View>
          <View style={styles.statButton}>
            <Text style={styles.statText}>Negociados: {stats.negociados}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
