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
    // Aqui você pode implementar a lógica de autenticação
    // Se o login for bem-sucedido, pode redirecionar para outra tela
    console.log('Login efetuado');
  };

  return (
    // ScrollView com container para centralizar os elementos
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo centralizada na parte superior */}
      <Image
        source={require('../../assets/images/coringa.png')}
        style={styles.logo}
      />

      {/* Container para a área de login com os inputs e botão */}
      <View style={styles.formContainer}>
        {/* Cabeçalho da tela */}
        <Text style={styles.header}>Login</Text>

        {/* Campo para o email */}
        <View style={styles.inputField}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Campo para a senha */}
        <View style={styles.inputField}>
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry
          />
        </View>

        {/* Botão de Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para solicitar contato, caso o usuário não tenha conta */}
        <View style={styles.signin}>
          <Text style={styles.signinText}>
            Não tem uma conta?
            <Text style={styles.linkText}> Solicitar contato</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
