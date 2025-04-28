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
  getNegotiationsByUser,
  updateItemStatus,
} from '../../config/database';

export default function Negotiations() {
  const router = useRouter();
  // Estado com as negociações (itens negociados pelo usuário)
  const [items, setItems] = useState<Item[]>([]);

  // Carrega negociações do usuário logado
  const loadNegotiations = async () => {
    try {
      const deals = await getNegotiationsByUser();
      setItems(deals);
    } catch (error) {
      console.error('Erro ao carregar negociações:', error);
    }
  };

  useEffect(() => {
    loadNegotiations();
  }, []);

  // Cancela o interesse e reabre o item
  const handleCancel = (itemId: string) => {
    Alert.alert(
      'Cancelar Interesse',
      'Deseja realmente cancelar este interesse?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            try {
              // Atualiza status de negociação para false
              const current = await getNegotiationsByUser(); // para obter e-mail
              const negotiationItem = current.find(i => i.id === itemId)!;
              await updateItemStatus(itemId, ''); // limpa negotiationUserEmail e isNegotiated no map
              await loadNegotiations();
            } catch {
              Alert.alert('Erro', 'Não foi possível cancelar o interesse.');
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
      <Text style={styles.header}>Minhas Negociações</Text>

      {/* Lista de interesses */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                <Text style={styles.cardDescription}>{item.descricao}</Text>
                <Text style={styles.cardInfo}>Qtd: {item.quantidade}</Text>
                <Text style={styles.cardInfo}>Unidade: {item.unidadeMedida}</Text>
                <Text style={styles.cardInfo}>Negociação: {item.tipoNegociacao}</Text>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item.id)}
              >
                <Text style={styles.cancelText}>✖️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>
          Você ainda não demonstrou interesse em nenhum item.
        </Text>
      )}
    </View>
  );
}
