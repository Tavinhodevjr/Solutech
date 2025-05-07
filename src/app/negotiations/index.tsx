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
  revertItemStatus,
} from '../../config/database';

export default function Negotiations() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  // Carrega as negociações do usuário logado
  const loadNegotiations = async () => {
    try {
      const deals = await getNegotiationsByUser();
      setItems(deals);
    } catch {
      console.error('Erro ao carregar negociações');
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
              await revertItemStatus(itemId);
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
    <>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>          Minhas Negociações</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Lista de interesses */}
      <View style={styles.container}>
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
                  <Text style={styles.cardInfo}>
                    Unidade: {item.unidadeMedida}
                  </Text>
                  <Text style={styles.cardInfo}>
                    Negociação: {item.tipoNegociacao}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(item.id)}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
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

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>
          © 2025 Solutech. Todos os direitos reservados.
        </Text>
      </View>
    </>
  );
}
