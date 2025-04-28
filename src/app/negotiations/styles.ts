// src/app/negotiations/styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
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
  cancelButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  cancelText: {
    fontSize: 18,
    color: colors.error, // cor de erro para destacá-lo
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
