import React, { useEffect, useState } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import {
  getItemsByUser,
  updateItem,
  Item,
} from '../../config/database';

export default function EditItens() {
  const router = useRouter();
  const { id } = useLocalSearchParams <{ id: string }>();

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoNegociacao, setTipoNegociacao] = useState('');

  // Opções pré-definidas
  const OPTIONS_UNIDADE = ['Metro (m)', 'Unidade (un)', 'Caixa (cx)', 'Conjunto(Cj)', 'Cancelar'];
  const OPTIONS_NEGOCIACAO = ['Doação', 'Venda', 'Troca', 'Cancelar'];

  /**
   * Abre um ActionSheet (iOS) ou Alert (Android) para seleção de opção.
   */
  const openOptions = (
    title: string,
    options: string[],
    callback: (value: string) => void
  ) => {
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
          onPress: () => {
            if (idx < options.length - 1) callback(opt);
          },
        }))
      );
    }
  };

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

  // Atualiza o item com os novos valores
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <View style={styles.header}>
          <Text style={styles.logo}>Editar Item</Text>
        </View>
        <View style={styles.formContainer}>
          {/* Nome */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* Unidade de medida (dropdown) */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Unidade de medida:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                openOptions('Selecione unidade', OPTIONS_UNIDADE, setUnidadeMedida)
              }
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
              style={styles.input}
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />
          </View>

          {/* Descrição */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          </View>

          {/* Tipo de negociação (dropdown) */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tipo de negociação:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                openOptions('Selecione negociação', OPTIONS_NEGOCIACAO, setTipoNegociacao)
              }
            >
              <Text style={styles.dropdownText}>
                {tipoNegociacao || 'Selecione uma opção'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botão para atualizar */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
}
