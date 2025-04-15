import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function Dashboard() {
  const router = useRouter();

  return (
    // Container principal, com rolagem e centralização dos elementos
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho da tela */}
      <Text style={styles.header}>Dashboard</Text>
      {/* Subtítulo com o resumo das atividades */}
      <Text style={styles.subHeader}>Resumo Geral das Atividades do Usuário</Text>

      {/* Card: Total de Itens Cadastrados */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Itens Cadastrados</Text>
        <Text style={styles.cardValue}>10</Text>
      </View>

      {/* Card: Total de Itens Editados */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Itens Editados</Text>
        <Text style={styles.cardValue}>3</Text>
      </View>

      {/* Card: Total de Itens Excluídos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Itens Excluídos</Text>
        <Text style={styles.cardValue}>2</Text>
      </View>

      {/* Card: Total de Logins Realizados */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Logins Realizados</Text>
        <Text style={styles.cardValue}>5</Text>
      </View>

      {/* Card: Total de Negociações feitas  */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Negociações Realizadas</Text>
        <Text style={styles.cardValue}>6</Text>
      </View>

      {/* Botão para voltar para a Home (ou outra ação que desejar) */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
