// src/app/home/styles.ts
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
    backgroundColor: "#39736f",
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
    backgroundColor: "#39736f",
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

  // Modais
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
