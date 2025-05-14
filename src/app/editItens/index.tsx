// src/app/editItens/index.tsx
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import { getItemsByUser, updateItem, Item } from '../../config/database';

export default function EditItens() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoNegociacao, setTipoNegociacao] = useState('');

  // Controla qual modal está visível: 'unidade' ou 'negociacao'
  const [modalVisible, setModalVisible] = useState<'unidade' | 'negociacao' | null>(null);

  // Opções pré-definidas
  const OPTIONS_UNIDADE = [
    'Quilograma (kg)',
    'Metro (m)',
    'Centímetro (cm)',
    'Litro (L)',
    'Unidade (un)',
    'Caixa (cx)',
  ];
  const OPTIONS_NEGOCIACAO = ['Doação', 'Venda', 'Troca'];

  // Carrega o item pelo ID e pré-popula os campos
  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const itens = await getItemsByUser();
        const item = itens.find(i => i.id === id);
        if (!item) {
          Alert.alert('Erro', 'Item não encontrado.');
          return router.push('/myItens');
        }
        setNome(item.tipoResiduo);
        setUnidadeMedida(item.unidadeMedida);
        setQuantidade(item.quantidade);
        setDescricao(item.descricao);
        setTipoNegociacao(item.tipoNegociacao);
      } catch (error) {
        console.error('Erro ao carregar item:', error);
      }
    })();
  }, [id]);

  /**
   * Atualiza o item com os novos valores
   */
  const handleUpdate = async () => {
    if (!nome || !unidadeMedida || !quantidade || !descricao || !tipoNegociacao) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
    try {
      const itens = await getItemsByUser();
      const original = itens.find(i => i.id === id)!;
      const updated: Item = {
        ...original,
        tipoResiduo: nome,
        unidadeMedida,
        quantidade,
        descricao,
        tipoNegociacao,
      };
      await updateItem(updated);
      Alert.alert('Sucesso', 'Item atualizado!', [
        { text: 'OK', onPress: () => router.push('/myItens') },
      ]);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o item.');
    }
  };

  /**
   * Renderiza cada opção dentro do modal
   */
  const renderOption = (opt: string, onSelect: (val: string) => void) => (
    <TouchableOpacity
      key={opt}
      style={styles.optionItem}
      onPress={() => {
        onSelect(opt);
        setModalVisible(null);
      }}
    >
      <Text style={styles.optionText}>{opt}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Bar com botões de voltar e cancelar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBarButton}>
            <Text style={styles.topBarIcon}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Container do formulário */}
        <View style={styles.formBox}>
          <Text style={styles.logo}>Editar Item</Text>
          <View style={styles.formContainer}>
            {/* Campo: Nome */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            {/* Campo: Unidade de medida */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Unidade de medida:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalVisible('unidade')}
              >
                <Text style={styles.dropdownText}>
                  {unidadeMedida || 'Selecione uma opção'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Campo: Quantidade */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Quantidade:</Text>
              <TextInput
                style={styles.input}
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
              />
            </View>

            {/* Campo: Descrição */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Descrição:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={descricao}
                onChangeText={setDescricao}
                multiline
              />
            </View>

            {/* Campo: Tipo de negociação */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Tipo de negociação:</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalVisible('negociacao')}
              >
                <Text style={styles.dropdownText}>
                  {tipoNegociacao || 'Selecione uma opção'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botão: Atualizar informações */}
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>ATUALIZAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal para seleção de opções */}
      <Modal
        visible={modalVisible !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(null)}
      >
        {/* Overlay que fecha ao tocar fora */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        {/* Conteúdo do modal */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {modalVisible === 'unidade' ? 'Selecione a unidade:' : 'Selecione negociação:'}
          </Text>
          <FlatList
            data={modalVisible === 'unidade' ? OPTIONS_UNIDADE : OPTIONS_NEGOCIACAO}
            keyExtractor={(item) => item}
            renderItem={({ item }) =>
              renderOption(
                item,
                modalVisible === 'unidade' ? setUnidadeMedida : setTipoNegociacao
              )
            }
          />
        </View>
      </Modal>

      {/* Bottom Bar fixa com direitos reservados */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Solutech © Todos os direitos reservados</Text>
      </View>
    </>
  );
}
