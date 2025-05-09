import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { styles } from './styles';
import {
  getItemsByOthers,
  removeCurrentUser,
  updateItemStatus,
  getCurrentUser,
  getUsers,
  Item,
} from '../../config/database';

export default function Home() {
  const router = useRouter();

  // Listas e filtros
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Dados do usuário
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');

  // Modais
  const [interestModal, setInterestModal] = useState<{ visible: boolean; item?: Item }>({ visible: false });
  const [logoutModal, setLogoutModal]     = useState(false);
  const [filterModal, setFilterModal]     = useState(false);

  const OPTIONS_NEGOCIACAO = ['Todos', 'Doação', 'Venda', 'Troca'];

  // Carrega usuário logado
  useEffect(() => {
    (async () => {
      const email = await getCurrentUser();
      if (!email) return;
      const users = await getUsers();
      const u = users.find(u => u.email === email);
      if (u) {
        setUserName(u.nome);
        setUserCompany(u.empresa);
      }
    })();
  }, []);

  // Carrega itens de outros usuários não negociados
  const loadItems = async () => {
    const others = await getItemsByOthers();
    setItems(others);
    setFilteredItems(others);
  };
  useEffect(() => { loadItems(); }, []);
  useFocusEffect(useCallback(() => { loadItems(); }, []));

  // Filtra por texto e tipo
  const applyFilters = (text: string, type: string | null) => {
    let data = items;
    if (type && type !== 'Todos') data = data.filter(i => i.tipoNegociacao === type);
    if (text) data = data.filter(i =>
      i.tipoResiduo.toLowerCase().includes(text.toLowerCase()) ||
      i.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(data);
  };
  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilters(text, filterType);
  };
  const handleFilterSelect = (type: string) => {
    setFilterType(type === 'Todos' ? null : type);
    applyFilters(search, type);
    setFilterModal(false);
  };

  // Interesse no item
  const confirmInterest = (item: Item) => {
    setInterestModal({ visible: true, item });
  };
  const onInterestYes = async () => {
    const item = interestModal.item!;
    const email = (await getCurrentUser()) || '';
    await updateItemStatus(item.id, email);
    await loadItems();
    setInterestModal({ visible: false });
    router.push('/negotiations');
  };

  // Logout confirmado
  const onLogout = async () => {
    await removeCurrentUser();
    router.push('/landingPage');
  };

  return (
    <>
      {/* ===== Top Bar ===== */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.userLabel}>Usuário: {userName}</Text>
          <Text style={styles.companyLabel}>Empresa: {userCompany}</Text>
        </View>
        <View style={styles.topBarActions}>
          {/* Botão de perfil */}
          <TouchableOpacity onPress={() => router.push('/profile')} style={styles.topBarActionButton}>
            <Text style={styles.topBarActionText}>Perfil</Text>
          </TouchableOpacity>
          {/* Botão de logout */}
          <TouchableOpacity onPress={() => setLogoutModal(true)} style={styles.topBarActionButton}>
            <Text style={styles.topBarActionText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== Container Principal ===== */}
      <View style={styles.mainContainer}>
        {/* Filtro de negociação */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModal(true)}
        >
          <Text style={styles.filterButtonText}>{filterType || 'Filtro'}</Text>
        </TouchableOpacity>

        {/* Barra de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar anúncios..."
          value={search}
          onChangeText={handleSearch}
        />

        {/* Lista de cards */}
        <FlatList
          data={filteredItems}
          keyExtractor={i => i.id}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhum item disponível.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Qtd: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unid.: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Neg.: {item.tipoNegociacao}</Text>
              </View>
              {/* Botão Interesse */}
              <TouchableOpacity
                style={styles.interestButton}
                onPress={() => confirmInterest(item)}
              >
                <Text style={styles.interestButtonText}>Interesse</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* ===== Bottom Bar ===== */}
      <View style={styles.bottomBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navContainer}
        >
          <TouchableOpacity onPress={() => router.push('/addItem')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/myItens')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Meus Itens</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/negotiations')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Negociações</Text>
          </TouchableOpacity>        
        </ScrollView>
      </View>

      {/* ===== Modais ===== */}
      {/* Confirmar Interesse */}
      <Modal visible={interestModal.visible} transparent animationType="fade" onRequestClose={() => setInterestModal({ visible: false })}>
        <TouchableWithoutFeedback onPress={() => setInterestModal({ visible: false })}>
          <View style={styles.modalOverlay}/>
        </TouchableWithoutFeedback>
        <View style={styles.confirmModal}>
          <Text style={styles.confirmTitle}>Confirmar Interesse</Text>
          <Text style={styles.confirmMessage}>
            Deseja demonstrar interesse em "{interestModal.item?.tipoResiduo}"?
          </Text>
          <View style={styles.confirmButtons}>
            <TouchableOpacity style={[styles.confirmButton, styles.cancelButton]} onPress={() => setInterestModal({ visible: false })}>
              <Text style={styles.cancelButtonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, styles.confirmButtonMain]} onPress={onInterestYes}>
              <Text style={styles.confirmButtonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmar Logout */}
      <Modal visible={logoutModal} transparent animationType="fade" onRequestClose={() => setLogoutModal(false)}>
        <TouchableWithoutFeedback onPress={() => setLogoutModal(false)}>
          <View style={styles.modalOverlay}/>
        </TouchableWithoutFeedback>
        <View style={styles.confirmModal}>
          <Text style={styles.confirmTitle}>Logout</Text>
          <Text style={styles.confirmMessage}>Deseja sair da sua conta?</Text>
          <View style={styles.confirmButtons}>
            <TouchableOpacity style={[styles.confirmButton, styles.cancelButton]} onPress={() => setLogoutModal(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, styles.confirmButtonMain]} onPress={onLogout}>
              <Text style={styles.confirmButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filtro de Negociação */}
      <Modal visible={filterModal} transparent animationType="fade" onRequestClose={() => setFilterModal(false)}>
        <TouchableWithoutFeedback onPress={() => setFilterModal(false)}>
          <View style={styles.modalOverlay}/>
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtrar por negociação:</Text>
          <FlatList
            data={OPTIONS_NEGOCIACAO}
            keyExtractor={v => v}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.optionItem} onPress={() => handleFilterSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}
