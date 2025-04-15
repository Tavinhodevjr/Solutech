import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal que centraliza os elementos e define o fundo e o padding
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
  },
  // Cabeçalho principal da tela
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 10,
  },
  // Subtítulo que exibe um resumo das atividades
  subHeader: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  // Estilo para os cards que exibem cada métrica
  card: {
    width: '100%',
    backgroundColor: colors.neutral,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  // Título de cada card (ex.: "Itens Cadastrados")
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 5,
  },
  // Valor exibido em cada card (ex.: "10")
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Botão para navegação ou outra ação
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  // Texto do botão
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
