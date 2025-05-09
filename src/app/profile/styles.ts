import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Topbar
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
    padding: 20,
    paddingBottom: 100, // espaço para bottombar
    backgroundColor: colors.background,
  },

  // Card resumo
  card: {
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Formulário
  formContainer: { width: '100%' },
  inputField: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
  },

  // Botões
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.neutral,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
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
