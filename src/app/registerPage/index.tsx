import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// Importa os estilos para a tela de cadastro
import { styles } from './styles';
// Importa o hook para navegação (caso queira navegar após o cadastro)
import { useRouter } from 'expo-router';

export default function Conectar() {
  const router = useRouter();

  // Função para tratar o envio do formulário de cadastro
  const handleSubmit = () => {
    // Implemente aqui a lógica para o cadastro do usuário
    console.log('Cadastro enviado');
    // Exemplo: após o cadastro, redirecione o usuário para outra tela
    // router.push('/algumaTela');
  };

  return (
    // ScrollView garante que o conteúdo role, se necessário
    <ScrollView contentContainerStyle={styles.container}>
      {/* Container que reúne o formulário */}
      <View style={styles.formContainer}>
        {/* Título do formulário */}
        <Text style={styles.header}>QUERO ME CONECTAR</Text>
        
        {/* Campo Nome */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={styles.input}
          />
        </View>
        
        {/* Campo E-mail */}
        <View style={styles.inputField}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        {/* Campo Senha */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry
          />
        </View>
        
        {/* Campo Empresa */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Empresa</Text>
          <TextInput
            placeholder="Digite o nome da empresa"
            style={styles.input}
          />
        </View>
        
        {/* Campo Telefone */}
        <View style={styles.inputField}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            placeholder="Digite seu telefone"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>
        
        {/* Botão de envio */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
