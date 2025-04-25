// src/app/login/index.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { authenticateUser, setCurrentUser } from '../../config/database'; // ← import adicionado

export default function Login() {
  const router = useRouter();

  // Estados para os campos de e-mail e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função chamada ao clicar no botão Entrar
  const handleLogin = async () => {
    // 1. Verifica se ambos os campos foram preenchidos
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }

    // 2. Tenta autenticar usuário
    const isValid = await authenticateUser(email, senha);

    if (isValid) {
      // 3.a. Define o usuário logado para que possamos filtrar itens por usuário
      await setCurrentUser(email);

      // 4.a. Autenticação bem-sucedida: mostra mensagem e redireciona à Home
      Alert.alert(
        'Sucesso',
        'Login efetuado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/home'),
          },
        ],
        { cancelable: false }
      );
    } else {
      // 4.b. Credenciais inválidas: alerta de erro e permanece na tela
      Alert.alert('Erro', 'Usuário não cadastrado ou dados incorretos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo no topo */}
      <Image
        source={require('../../assets/images/logoBranca.png')}
        style={styles.logo}
      />

      <View style={styles.formContainer}>
        <Text style={styles.header}>ENTRE NA SUA CONTA</Text>

        {/* Campo de E-mail */}
        <View style={styles.inputField}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para cadastro, caso não tenha conta */}
        <View style={styles.signin}>
          <Text style={styles.signinText}>
            Não tem uma conta?
            <Text
              style={styles.linkText}
              onPress={() => router.push('/registerPage')}
            >
              {' '}Cadastre
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
