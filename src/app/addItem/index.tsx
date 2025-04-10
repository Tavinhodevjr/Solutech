import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
// Importa os estilos para a tela de cadastro dos itens
import { styles } from './styles';
// Importa o hook para navegação, caso seja necessário navegar após o cadastro
import { useRouter } from 'expo-router';

export default function AddItem() {
  const router = useRouter();

  // Função para tratar o envio do formulário de cadastro dos itens
  const handleSubmit = () => {
    // Aqui você pode implementar a lógica para enviar os dados
    console.log('Dados do item enviados');
  };

  // Função de exemplo para tratar o "dropdown" (apenas um placeholder)
  const handleSelect = (field: string) => {
    // Implemente a lógica para abrir um modal ou selecionar a opção desejada
    console.log(`Selecionar opção para ${field}`);
  };

  return (
    // ScrollView com container para permitir a rolagem e centralizar o conteúdo
    <ScrollView contentContainerStyle={styles.container}>
      {/* Caixa que envolve todo o formulário */}
      <View style={styles.formBox}>
        {/* Cabeçalho com o logo (neste caso, o texto "Solutech") */}
        <View style={styles.header}>
          <Text style={styles.logo}>Solutech</Text>
        </View>

        {/* Container do formulário */}
        <View style={styles.formContainer}>
          {/* Título do formulário */}
          <Text style={styles.title}>Insira os dados</Text>

          {/* Campo: Nome */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              placeholder="Digite o nome"
              style={styles.input}
            />
          </View>

          {/* Campo: Unidade de medida (simulado como dropdown) */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Unidade de medida:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => handleSelect('unidade de medida')}
            >
              <Text style={styles.dropdownText}>Selecione uma opção</Text>
            </TouchableOpacity>
          </View>

          {/* Campo: Quantidade */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Quantidade:</Text>
            <TextInput
              placeholder="Digite a quantidade"
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          {/* Campo: Descrição */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              placeholder="Digite a descrição"
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Campo: Tipo de negociação (simulado como dropdown) */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Tipo de negociação:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => handleSelect('tipo de negociação')}
            >
              <Text style={styles.dropdownText}>Selecione uma opção</Text>
            </TouchableOpacity>
          </View>

          {/* Campo: Imagem (botão para selecionar imagem) */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Coloque uma foto aqui:</Text>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => console.log('Selecionar imagem')}
            >
              <Text style={styles.imageButtonText}>Selecionar imagem</Text>
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
