import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida em src/styles/colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal que centraliza o conteúdo e define o fundo
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  // Container do formulário de cadastro
  formContainer: {
    width: '100%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  // Título do formulário
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  // Container para cada campo de entrada
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  // Estilo dos labels acima dos inputs
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  // Estilo dos inputs (fundo branco para contraste)
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
  },
  // Estilo do botão de envio
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  // Estilo do texto no botão
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
