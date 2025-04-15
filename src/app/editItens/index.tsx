import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter} from 'expo-router';
import { styles } from './styles';

export default function EditItens() {
  const router = useRouter();
  // Caso você queira passar parâmetros da rota (por exemplo, o id do item a editar),
  // use o hook useSearchParams() do Expo Router. Exemplo: import { useRouter, useSearchParams } from 'expo-router';
  // const { id } = useSearchParams();

  // Estados para os campos do formulário (pré-populados com valores fictícios para demonstração)
  const [nome, setNome] = useState('Papel'); // Exemplo: nome do item (tipoResiduo)
  const [unidadeMedida, setUnidadeMedida] = useState('Quilograma (kg)');
  const [quantidade, setQuantidade] = useState('100');
  const [descricao, setDescricao] = useState('Papéis recicláveis de escritório');
  const [tipoNegociacao, setTipoNegociacao] = useState('Troca');

  // FUNÇÃO: para tratar o envio do formulário de atualização do item
  const handleUpdate = () => {
    // Implemente aqui a lógica de atualização do item
    console.log('Item atualizado');
    // Após atualizar, você pode redirecionar o usuário, por exemplo:
    // router.push('/myItens');
  };

  return (
    // ScrollView para permitir rolagem se necessário
    <ScrollView contentContainerStyle={styles.container}>
      {/* Caixa que envolve todo o formulário */}
      <View style={styles.formBox}>
        {/* Cabeçalho com o logo ou título */}
        <View style={styles.header}>
          <Text style={styles.logo}>Editar Item</Text>
        </View>

        {/* Container do formulário */}
        <View style={styles.formContainer}>
          {/* Campo: Nome */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              placeholder="Digite o nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* Campo: Unidade de medida */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Unidade de medida:</Text>
            {/* Aqui usamos um TouchableOpacity para simular um dropdown.
                No futuro, a lógica de seleção poderá ser implementada */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => console.log('Selecionar unidade de medida')}
            >
              <Text style={styles.dropdownText}>{unidadeMedida}</Text>
            </TouchableOpacity>
          </View>

          {/* Campo: Quantidade */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
              placeholder="Digite a quantidade"
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
              placeholder="Digite a descrição"
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Campo: Tipo de negociação */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tipo de negociação:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => console.log('Selecionar tipo de negociação')}
            >
              <Text style={styles.dropdownText}>{tipoNegociacao}</Text>
            </TouchableOpacity>
          </View>

          {/* Botão para atualizar as informações do item */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
