import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { saveItem, getCurrentUser } from '../../config/database';
import { Item } from '../../config/database';

export default function AddItem() {
  const router = useRouter();

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoNegociacao, setTipoNegociacao] = useState('');

  // Opções pré-definidas
  const OPTIONS_UNIDADE = ['Metro (m)', 'Unidade (un)', 'Caixa (cx)', 'Cancelar'];
  const OPTIONS_NEGOCIACAO = ['Doação', 'Venda', 'Troca', 'Cancelar'];

  // Abre ActionSheet (iOS) ou Alert (Android) para seleção
  const openOptions = (title: string, options: string[], callback: (value: string) => void) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title, options, cancelButtonIndex: options.length - 1 },
        buttonIndex => {
          if (buttonIndex < options.length - 1) {
            callback(options[buttonIndex]);
          }
        }
      );
    } else {
      Alert.alert(
        title,
        '',
        options.map((opt, idx) => ({
          text: opt,
          onPress: () => { if (idx < options.length - 1) callback(opt); },
        }))
      );
    }
  };

  // Trata o envio do formulário
  const handleSubmit = async () => {
    // 1. Validações
    if (!nome || !unidadeMedida || !quantidade || !descricao || !tipoNegociacao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    // 2. Persiste o item associado ao usuário atual
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
      };
      await saveItem(newItem);
      // 3. Confirmação e redirecionamento
      Alert.alert(
        'Sucesso',
        'Item cadastrado!',
        [{ text: 'OK', onPress: () => router.push('/myItens') }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o item.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <View style={styles.header}>
          <Text style={styles.logo}>Cadastrar Item</Text>
        </View>

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

          {/* Unidade de medida */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Unidade de medida:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => openOptions('Selecione unidade', OPTIONS_UNIDADE, setUnidadeMedida)}
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
              numberOfLines={3}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          {/* Tipo de negociação */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tipo de negociação:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => openOptions('Selecione negociação', OPTIONS_NEGOCIACAO, setTipoNegociacao)}
            >
              <Text style={styles.dropdownText}>
                {tipoNegociacao || 'Selecione uma opção'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botão de envio */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
