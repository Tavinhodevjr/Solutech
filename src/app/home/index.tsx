import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';

// Define a interface para os itens que serão exibidos
interface Item {
  id: string;
  tipoResiduo: string;
  descricao: string;
  quantidade: string;
  formaDescarte: string;
  tipoEntrega: string;
}

const Home = () => {
  // Estado inicial com dados estáticos para visualização
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      tipoResiduo: 'Papel',
      descricao: 'Papéis recicláveis de escritório',
      quantidade: '100',
      formaDescarte: 'Reciclagem',
      tipoEntrega: 'Troca',
    },
    {
      id: '2',
      tipoResiduo: 'Plástico',
      descricao: 'Garrafas PET para reciclagem',
      quantidade: '50',
      formaDescarte: 'Descarte',
      tipoEntrega: 'Venda',
    },
  ]);
  
  // Estado para armazenar o texto da busca
  const [search, setSearch] = useState('');
  // Estado para armazenar os itens filtrados com base na busca
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  const router = useRouter();

  // FUNÇÃO PARA IMPLEMENTAR A LÓGICA DE FILTRAGEM
  // Esta função será aprimorada no futuro caso a lógica mude
  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = items.filter(item =>
      item.tipoResiduo.toLowerCase().includes(text.toLowerCase()) ||
      item.descricao.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // FUNÇÃO PARA IMPLEMENTAR O LOGOUT
  // No futuro, adicione a lógica de remoção dos dados do usuário
  const handleLogout = () => {
    console.log('Logout realizado');
    // Exemplo: redirecionamento para a tela de landingPage após o logout
    router.push('/landingPage');
  };

  return (
    // CONTAINER PRINCIPAL DA HOME
    <View style={styles.container}>
      {/* ===== MENU / NAVBAR ===== */}
      <View style={styles.menuContainer}>
        {/* Botão para navegar para a tela de "Cadastrar Itens" */}
        <TouchableOpacity onPress={() => router.push('/addItem')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Cadastrar Itens</Text>
        </TouchableOpacity>
        {/* Botão para navegar para a tela de "Meus Itens" */}
        <TouchableOpacity onPress={() => router.push('/myItens')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Meus Itens</Text>
        </TouchableOpacity>
        {/* Botão para navegar para a tela de "Dashboard Geral" */}
        <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Dashboard Geral</Text>
        </TouchableOpacity>
        {/* Botão de Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* TÍTULO DO CARD */}
              <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
              {/* DESCRIÇÃO DO ITEM */}
              <Text style={styles.cardDescription}>{item.descricao}</Text>
              {/* INFORMAÇÕES ADICIONAIS */}
              <Text style={styles.cardInfo}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.cardInfo}>Forma de Descarte: {item.formaDescarte}</Text>
              <Text style={styles.cardInfo}>Tipo de Entrega: {item.tipoEntrega}</Text>
            </View>
          )}
        />
      ) : (
        // MENSAGEM PARA CASO NÃO HAJA ITENS CADASTRADOS
        <Text style={styles.emptyMessage}>
          Nenhum item cadastrado ainda. Clique em "Cadastrar Itens" para adicionar um novo anúncio.
        </Text>
      )}
    </View>
  );
};

export default Home;
