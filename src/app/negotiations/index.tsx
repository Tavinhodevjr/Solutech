import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
import { styles } from './styles';
import {
  Item,
  getNegotiationsByUser,
  revertItemStatus,
} from '../../config/database';
import { getUsers } from '../../config/database';

export default function Negotiations() {
  const router = useRouter();
  // Lista de itens em negociação
  const [items, setItems] = useState<Item[]>([]);
  // Estado do modal de detalhes
  const [detailModal, setDetailModal] = useState<{
    visible: boolean;
    item?: Item;
    contact?: { nome: string; email: string; empresa: string };
  }>({ visible: false });

  /** Carrega negociações do usuário logado */
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

  /** Cancela o interesse e reabre o item */
  const confirmCancel = (itemId: string) => {
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

  /** Abre modal de detalhes pescando contato do cadastrante */
  const openDetail = async (item: Item) => {
    // Busca usuário que cadastrou este item
    const users = await getUsers();
    const u = users.find(u => u.email === item.userEmail);
    setDetailModal({
      visible: true,
      item,
      contact: u
        ? { nome: u.nome, email: u.email, empresa: u.empresa }
        : undefined,
    });
  };

  /** Envia e-mail via MailComposer */
  const sendEmail = () => {
    if (!detailModal.contact || !detailModal.item) return;
    MailComposer.composeAsync({
      recipients: [detailModal.contact.email],
      subject: `Interesse no item ${detailModal.item.tipoResiduo}`,
      body: `Olá ${detailModal.contact.nome},\n\nTenho interesse no seu anúncio "${detailModal.item.tipoResiduo}". Podemos conversar?\n\nAtenciosamente,\n`,
    });
  };

  return (
    <>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Negociações</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Conteúdo */}
      <View style={styles.container}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {/* Conteúdo clicável abre detalhes */}
                <TouchableOpacity
                  style={styles.cardContent}
                  onPress={() => openDetail(item)}
                >
                  <Text style={styles.cardTitle}>{item.tipoResiduo}</Text>
                  <Text style={styles.cardDescription}>{item.descricao}</Text>
                  <Text style={styles.cardInfo}>Qtd: {item.quantidade}</Text>
                  <Text style={styles.cardInfo}>Unidade: {item.unidadeMedida}</Text>
                  <Text style={styles.cardInfo}>Negociação: {item.tipoNegociacao}</Text>
                  {/* Badge de status */}
                  <Text
                    style={[
                      styles.badge,
                      item.negotiationStatus === 'aguardando'
                        ? styles.badgePending
                        : styles.badgeFinalized,
                    ]}
                  >
                    {item.negotiationStatus === 'aguardando'
                      ? 'Aguardando confirmação'
                      : 'Negociação finalizada'}
                  </Text>
                </TouchableOpacity>

                {/* Só permite cancelar se ainda estiver aguardando */}
                {item.negotiationStatus === 'aguardando' && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => confirmCancel(item.id)}
                  >
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyMessage}>
            Você ainda não demonstrou interesse em nenhum item.
          </Text>
        )}
      </View>

      {/* Modal de detalhes */}
      <Modal
        visible={detailModal.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setDetailModal({ visible: false })}
      >
        <TouchableWithoutFeedback onPress={() => setDetailModal({ visible: false })}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.detailModal}>
          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={() => setDetailModal({ visible: false })}>
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
            <View style={styles.divider} />
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

      {/* Bottombar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>
          © 2025 Solutech. Todos os direitos reservados.
        </Text>
      </View>
    </>
  );
}
