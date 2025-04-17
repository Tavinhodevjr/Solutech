import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { saveUser } from '../../config/database';  // ← função de persistência

export default function RegisterPage() {
  const router = useRouter();

  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefone, setTelefone] = useState('');

  // Validação básica de e-mail
  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  // Função chamada ao clicar em ENVIAR
  const handleSubmit = async () => {
    // 1. Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha || !empresa || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    // 2. Valida o formato do e-mail
    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    try {
      // 3. Salva o usuário no AsyncStorage
      await saveUser({ nome, email, senha, empresa, telefone });
      // 4. Mostra mensagem de sucesso e redireciona para login
      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/login'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar os dados.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>CRIE SUA CONTA</Text>

        {/* Nome */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* E-mail */}
        <View style={styles.inputField}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Senha */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Empresa */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Empresa:</Text>
          <TextInput
            placeholder="Digite o nome da empresa"
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
          />
        </View>

        {/* Telefone */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            placeholder="Digite seu telefone"
            style={styles.input}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        {/* Botão ENVIAR */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
