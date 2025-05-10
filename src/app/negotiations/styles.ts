import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButton: { padding: 8 },
  backText: { color: colors.background, fontSize: 16 },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Container principal
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingBottom: 80,
  },

  // Card de negociação
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Badge de status
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  badgePending: {
    backgroundColor: colors.secondary,
    color: colors.background,
  },
  badgeFinalized: {
    backgroundColor: colors.successLight,
    color: colors.successDark,
  },

  // Botão cancelar
  cancelButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.errorLight,
    borderRadius: 4,
  },
  cancelText: {
    color: colors.errorDark,
    fontWeight: 'bold',
  },

  // Mensagem vazia
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Modal overlay e detalhe
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },
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

  // Bottombar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 12,
  },
  bottomText: {
    color: colors.background,
    fontSize: 12,
  },
});
