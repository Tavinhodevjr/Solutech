import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida no arquivo colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal da tela MyItens
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  // Cabeçalho da página
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  // Estilo para cada card que representa um item cadastrado
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',      // Permite a disposição lado a lado entre conteúdo e ações
    alignItems: 'center',
  },
  // Área para o conteúdo do card (lado esquerdo)
  cardContent: {
    flex: 1,
  },
  // Título do card
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  // Descrição do item
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  // Informações adicionais do item
  cardInfo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  // Área para os botões de ação (lado direito)
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Botão para cada ação (editar e excluir)
  actionButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  // Texto dos botões de ação (ícones)
  actionText: {
    fontSize: 18,
    color: colors.background,
  },
  // Mensagem para quando não houver itens cadastrados
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
