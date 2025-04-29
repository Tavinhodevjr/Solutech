import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
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
  // Estado com os itens do usuário logado
  const [items, setItems] = useState<Item[]>([]);

  // Carrega os itens do usuário quando a tela monta ou após exclusão
  const loadItems = async () => {
    try {
      const userItems = await getItemsByUser();
      setItems(userItems);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Navega para edição, passando o ID
  const handleEdit = (itemId: string) => {
    router.push(`/editItens?id=${itemId}`);
  };

  // Confirmação e exclusão do item
  const handleDelete = (itemId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeItemById(itemId);
              await loadItems();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o item.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>Meus Itens</Text>

      {/* Lista de itens do usuário */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unidade: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Negociação: {item.tipoNegociacao}</Text>
                {/* Novo: badge de status */}
                <Text
                  style={[
                    styles.cardStatus,
                    item.isNegotiated
                      ? styles.statusClosed
                      : styles.statusOpen,
                  ]}
                >
                  {item.isNegotiated ? 'Negociado' : 'Aberto'}
                </Text>
              </View>
              <View style={styles.cardActions}>
                {/* Editar */}
                <TouchableOpacity
                  onPress={() => handleEdit(item.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                {/* Excluir */}
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>
          Você ainda não cadastrou nenhum item.
        </Text>
      )}
    </View>
       
  );
}

