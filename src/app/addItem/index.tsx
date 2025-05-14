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
   * Valida e salva o item no AsyncStorage
   */
  const handleSubmit = async () => {
    if (!nome || !unidadeMedida || !quantidade || !descricao || !tipoNegociacao) {
      Alert.alert(
        'Erro',
        'Por favor, preencha todos os campos.',
        [{ text: 'OK', style: 'destructive' }],
        { cancelable: false }
      );
      return;
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
      Alert.alert(
        'Sucesso',
        'Item cadastrado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/myItens'),
            style: 'default',
          },
        ],
        { cancelable: false }
      );
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível salvar o item.',
        [{ text: 'OK', style: 'destructive' }],
        { cancelable: false }
      );
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
        {/* Top Bar: botão voltar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topBarButton}>
            <Text style={styles.topBarIcon}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Container do formulário */}
        <View style={styles.formBox}>
          <Text style={styles.logo}>Cadastrar Item</Text>
          <View style={styles.formContainer}>
            {/* Nome */}
            <View style={styles.inputField}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                placeholder="Digite o nome do resíduo"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            {/* Unidade */}
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

            {/* Quantidade */}
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

            {/* Descrição */}
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

            {/* Tipo de negociação */}
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

            {/* Botão Adicionar */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de seleção */}
      <Modal
        visible={modalVisible !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(null)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
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

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Solutech © Todos os direitos reservados</Text>
      </View>
    </>
  );
}
