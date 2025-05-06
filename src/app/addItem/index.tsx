// src/app/addItem/index.tsx
import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { saveItem, getCurrentUser, Item } from '../../config/database';

export default function AddItem() {
  const router = useRouter();

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoNegociacao, setTipoNegociacao] = useState('');

  // Controla qual modal está visível: 'unidade' ou 'negociacao'
  const [modalVisible, setModalVisible] = useState<'unidade' | 'negociacao' | null>(null);

  // Opções para seleção
  const OPTIONS_UNIDADE = [
    'Quilograma (kg)',
    'Metro (m)',
    'Centímetro (cm)',
    'Litro (L)',
    'Unidade (un)',
    'Caixa (cx)',
  ];
  const OPTIONS_NEGOCIACAO = ['Doação', 'Venda', 'Troca'];

  /**
   * Função que valida e salva o item no AsyncStorage
   */
  const handleSubmit = async () => {
    if (!nome || !unidadeMedida || !quantidade || !descricao || !tipoNegociacao) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
    try {
      const userEmail = await getCurrentUser();
      const newItem: Item = {
        id: Date.now().toString(),
        userEmail: userEmail || '',
        tipoResiduo: nome,
        unidadeMedida,
        quantidade,
        descricao,
        tipoNegociacao,
        isNegotiated: false,
      };
      await saveItem(newItem);
      Alert.alert('Sucesso', 'Item cadastrado!', [
        { text: 'OK', onPress: () => router.push('/myItens') },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o item.');
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
        {/* Top Bar: botão voltar e cancelar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBarButton}>
            <Text style={styles.topBarIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBarButton}>
            <Text style={styles.topBarIcon}>✖️</Text>
          </TouchableOpacity>
        </View>

        {/* Container do formulário */}
        <View style={styles.formBox}>
          <Text style={styles.logo}>Cadastrar Item</Text>
          <View style={styles.formContainer}>
            {/* Campo: Nome do resíduo */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                placeholder="Digite o nome do resíduo"
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
                placeholder="Digite a quantidade"
                style={styles.input}
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
              />
            </View>

            {/* Campo: Descrição */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Descrição:</Text>
              <TextInput
                placeholder="Digite a descrição"
                style={[styles.input, styles.textArea]}
                multiline
                value={descricao}
                onChangeText={setDescricao}
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

            {/* Botão: Adicionar item */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de seleção de opções */}
      <Modal
        visible={modalVisible !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(null)}
      >
        {/* Overlay para fechar ao tocar fora */}
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

      {/* Bottom Bar fixa */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Solutech © Todos os direitos reservados</Text>
      </View>
    </>
  );
}
