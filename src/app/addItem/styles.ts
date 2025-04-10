import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida em src/styles/colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal que centraliza o conteúdo e define o fundo (utilizando toda a altura da tela)
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  // Caixa que envolve todo o formulário (semelhante à "form-box" do HTML)
  formBox: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
    // Centraliza os elementos internamente
    alignItems: 'center',
  },
  // Cabeçalho com o logo (aqui, apenas o texto "Solutech")
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  // Estilo do logo (texto com destaque)
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Container do formulário
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  // Título do formulário
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  // Container para cada campo de entrada
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  // Estilo dos labels (texto acima de cada input)
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  // Estilo dos inputs (campo de texto) com fundo branco para contraste
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
  },
  // Estilo para inputs multiline (área de descrição)
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  // Estilo para simular um dropdown (campo de seleção)
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  // Texto interno do dropdown
  dropdownText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  // Botão para selecionar uma imagem
  imageButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  // Texto do botão de selecionar imagem
  imageButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  // Container para o botão de envio
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  // Estilo do botão de envio
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  // Estilo do texto do botão
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
