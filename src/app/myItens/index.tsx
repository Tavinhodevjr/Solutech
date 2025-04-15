import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';

// Define a interface para representar os itens cadastrados
interface Item {
  id: string;
  tipoResiduo: string;
  descricao: string;
  quantidade: string;
  formaDescarte: string;
  tipoEntrega: string;
}

const MyItens = () => {
  // Estado com dados estáticos para visualização; futuramente, você integrará com os dados reais do back end
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      tipoResiduo: 'Papel',
      descricao: 'Papelão reciclável de escritório',
      quantidade: '80',
      formaDescarte: 'Reciclagem',
      tipoEntrega: 'Troca',
    },
    {
      id: '2',
      tipoResiduo: 'Metal',
      descricao: 'Sucata metálica',
      quantidade: '30',
      formaDescarte: 'Descarte',
      tipoEntrega: 'Venda',
    },
  ]);

  const router = useRouter();

  // FUNÇÃO: Para tratar o clique no botão de editar item  
  // Aqui você implementará a lógica para editar o item selecionado
  const handleEdit = (itemId: string) => {
    console.log(`Editar item ${itemId}`);
    // Exemplo: router.push(`/editItem/${itemId}`);
  };

  // FUNÇÃO: Para tratar o clique no botão de excluir item  
  // Aqui você implementará a lógica para excluir o item selecionado, com confirmação se necessário
  const handleDelete = (itemId: string) => {
    console.log(`Excluir item ${itemId}`);
    // Futuro: Implementar confirmação e exclusão do item
  };

  return (
    // CONTAINER PRINCIPAL DA TELA "MY ITENS"
    <View style={styles.container}>
      {/* Cabeçalho da tela */}
      <Text style={styles.header}>Meus Itens</Text>
      
      {/* LISTA DE CARDS DOS ITENS */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // Cada card é estruturado em duas partes:
            // 1. Conteúdo do item (lado esquerdo)
            // 2. Ações: botões para editar e excluir (lado direito)
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Forma de Descarte: {item.formaDescarte}</Text>
                <Text style={styles.cardInfo}>Tipo de Entrega: {item.tipoEntrega}</Text>
              </View>
              
              {/* AREA DAS AÇÕES: Botões de Editar e Excluir */}
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.actionButton}>
                  {/* Ícone de lápis para Editar (pode ser substituído por um ícone de biblioteca no futuro) */}
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                  {/* Ícone de lixeira para Excluir */}
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        // MENSAGEM EXIBIDA QUANDO NÃO HOUVER ITENS CADASTRADOS
        <Text style={styles.emptyMessage}>
          Você ainda não cadastrou nenhum item.
        </Text>
      )}
    </View>
  );
};

export default MyItens;
