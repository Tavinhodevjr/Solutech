import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida em src/styles/colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal com rolagem (centralizado verticalmente)
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  // Estilização da logo (imagem centralizada no topo)
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  // Container do formulário de login (inputs e botão)
  formContainer: {
    width: '100%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  // Cabeçalho do formulário
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  // Container para cada campo de input
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  // Estilos para os inputs
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
  },
  // Estilo do botão de login
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  // Estilo do texto do botão
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Container para a área de "Solicitar contato"
  signin: {
    marginTop: 10,
  },
  // Estilo do texto complementar
  signinText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  // Estilo para o link (solicitação de contato)
  linkText: {
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
});
