import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userLabel: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  companyLabel: {
    color: colors.background,
    fontSize: 12,
  },
  topBarActions: {
    flexDirection: 'row',
  },
  topBarActionButton: {
    backgroundColor: colors.secondary,
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  topBarActionText: {
    color: colors.background,
    fontSize: 14,
  },

  // Container Principal (entre topbar e bottombar)
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },

  // Filtro
  filterButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 8,
  },
  filterButtonText: {
    color: colors.background,
    fontSize: 14,
  },

  // Busca
  searchInput: {
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.background,
    marginBottom: 12,
  },

  // Cards
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.textSecondary,
  },

  // Botão Interesse
  interestButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  interestButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Modais genéricos
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
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

  // Filtro
  modalContent: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 16,
    maxHeight: '40%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  // Confirm dialogs
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
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

  // Detalhes do Item
  detailModal: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '20%',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailBack: {
    fontSize: 20,
    color: colors.primary,
    marginRight: 12,
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
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral,
    marginVertical: 12,
  },
  emailButton: {
    backgroundColor: colors.secondary,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  emailButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Bottom Bar
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
    justifyContent: 'space-around',
  },
  navButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  navButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
