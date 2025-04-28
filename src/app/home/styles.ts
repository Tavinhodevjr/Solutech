import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  menuButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.neutral,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',           // permite alinhar conteúdo e botão lado a lado
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
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
  negotiateButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  negotiateText: {
    fontSize: 18,
    color: colors.background,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
