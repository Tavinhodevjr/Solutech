import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida em src/styles/colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal, centralizando o conteúdo e utilizando o fundo padrão
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  // Caixa que envolve o formulário, com tamanho máximo e fundo diferenciado
  formBox: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  // Cabeçalho com o título ou logo da tela de edição
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  // Estilo do "logo" ou título no cabeçalho (texto destacado)
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  // Container que agrupa os campos do formulário
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  // Estilo do título do formulário (pode ser utilizado para subtítulos)
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  // Container para cada campo de entrada (label + input)
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  // Estilo para os labels dos campos
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  // Estilo para os inputs com fundo branco para contraste
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
  },
  // Estilo para inputs multiline (ex: descrição)
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  // Estilo para simular um dropdown para seleção
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  // Texto exibido dentro do dropdown
  dropdownText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  // Estilo do botão de envio/atualização
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  // Estilo do texto dentro do botão
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
