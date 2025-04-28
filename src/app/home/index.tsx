// src/app/home/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import {
  getItemsByOthers,
  removeCurrentUser,
  saveNegotiation,
  updateItemStatus,
  getCurrentUser,
  Item,
} from '../../config/database';

export default function Home() {
  const router = useRouter();

  // Todos os itens de outros usuários
  const [items, setItems] = useState<Item[]>([]);
  // Texto da busca
  const [search, setSearch] = useState('');
  // Itens filtrados para a lista
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // Carrega os itens de outros usuários ao montar
  const loadItems = async () => {
    try {
      const others = await getItemsByOthers();
      setItems(others);
      setFilteredItems(others);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Filtra conforme o texto digitado
  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = items.filter(item =>
      item.tipoResiduo.toLowerCase().includes(text.toLowerCase()) ||
      item.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Realiza logout real: remove sessão e volta à landing
  const handleLogout = async () => {
    await removeCurrentUser();
    Alert.alert('Logout', 'Você saiu da sua conta.', [
      { text: 'OK', onPress: () => router.push('/landingPage') },
    ]);
  };

  // Tratar clique no botão de interesse (check)
  const handleInterest = (item: Item) => {
    Alert.alert(
      'Confirmar Interesse',
      `Deseja demonstrar interesse em "${item.tipoResiduo}"?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              // 1. Marca o item como negociado
              const currentEmail = await getCurrentUser();
              await updateItemStatus(item.id, currentEmail || '');
              // 2. Recarrega a Home (remove o card)
              await loadItems();
              // 3. Vai para Minhas Negociações
              router.push('/negotiations');
            } catch {
              Alert.alert('Erro', 'Não foi possível registrar o interesse.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* ===== MENU / NAVBAR HORIZONTAL ===== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}
      >
        <TouchableOpacity
          onPress={() => router.push('/addItem')}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Cadastrar Itens</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/myItens')}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Meus Itens</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard')}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Dashboard Geral</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/negotiations')}
          style={styles.menuButton}
        >
          <Text style={styles.menuButtonText}>Negociações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ===== BARRA DE BUSCA ===== */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar anúncios..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* ===== LISTA DE CARDS DOS ITENS ===== */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Detalhes do item */}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unidade: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Negociação: {item.tipoNegociacao}</Text>
              </View>

              {/* Botão de interesse (check) */}
              <TouchableOpacity
                style={styles.negotiateButton}
                onPress={() => handleInterest(item)}
              >
                <Text style={styles.negotiateText}>✔️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>
          Nenhum item de outros usuários disponível. Seja o primeiro a cadastrar!
        </Text>
      )}
    </View>
  );
}
