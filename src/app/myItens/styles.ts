// src/app/myItens/styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container da lista
  container: {
    flex: 1,                   // ocupa 100% da altura
  padding: 20,               // mantém o espaçamento interno
    backgroundColor: colors.background,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  topBarButton: {
    padding: 4,
  },
  topBarIcon: {
    fontSize: 20,
    color: colors.background,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },
  topBarSpacing: {
    width: 28, // mantém alinhamento
  },

  // Card de item
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  cardInfo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardStatus: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  statusOpen: {
    backgroundColor: colors.successLight,
    color: colors.successDark,
  },
  statusClosed: {
    backgroundColor: colors.errorLight,
    color: colors.errorDark,
  },

  // Botões de ação
  cardActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  actionText: {
    fontSize: 16,
    color: colors.background, // ícones brancos
  },

  // Mensagem quando não há itens
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  // Modal de confirmação
  confirmModal: {
    position: 'absolute',
    top: '35%',
    left: '10%',
    right: '10%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.neutral,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  confirmButtonMain: {
    backgroundColor: colors.primary,
  },
  confirmButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },

  // Bottom Bar fixa
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bottomBarText: {
    color: colors.background,
    fontSize: 14,
  },
});
