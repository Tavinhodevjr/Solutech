import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal da lista
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 10,
    paddingBottom: 80, // espaço para bottom bar
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
    fontSize: 16,
    color: colors.background,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },

  // Barra de busca + filtro
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  filterButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  filterButtonText: {
    color: colors.background,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.background,
  },

  // Card de item
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
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

  // Badge de status
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
  statusPending: {
    backgroundColor: colors.alertLight,
    color: colors.alertDark,
  },
  statusClosed: {
    backgroundColor: colors.errorLight,
    color: colors.errorDark,
  },

  // Ações do card
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
  actionButtonDisabled: {
    backgroundColor: colors.neutral,
  },
  actionText: {
    fontSize: 16,
    color: colors.background,
  },

  // Mensagem de lista vazia
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Overlay genérico
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },

  // Modais
  modalContent: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 16,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  optionText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
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

  // Modal de detalhes
  detailModal: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '20%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 16,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailBack: {
    fontSize: 20,
    color: colors.primary,
    marginRight: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral,
    marginVertical: 12,
  },
  emailButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  emailButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bottom Bar com carousel
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  statText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
