import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// Importa os estilos para a tela de login
import { styles } from './styles';
// Importa o hook para navegação do Expo Router
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  // Função para tratar o clique no botão de login
  const handleLogin = () => {
    // Aqui você pode implementar a lógica de autenticação.
    // Se o login for bem-sucedido, redirecione para outra tela.
    console.log('Login efetuado');
  };

  return (
    // ScrollView com container para centralizar os elementos
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo centralizada na parte superior */}
      <Image
        source={require('../../assets/images/logoBranca.png')}
        style={styles.logo}
      />

      {/* Container para a área de login com os inputs e botão */}
      <View style={styles.formContainer}>
        {/* Cabeçalho da tela */}
        <Text style={styles.header}>ENTRE NA SUA CONTA</Text>

        {/* Campo para o email com label */}
        <View style={styles.inputField}>
          {/* Label para E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Campo para a senha com label */}
        <View style={styles.inputField}>
          {/* Label para Senha */}
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry
          />
        </View>

        {/* Botão de Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para cadastro */}
        <View style={styles.signin}>
          <Text style={styles.signinText}>
            Não tem uma conta?
            <Text style={styles.linkText}> Cadastre</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
