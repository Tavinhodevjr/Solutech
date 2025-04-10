import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida em src/styles/colors.ts
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Estilo do container principal da tela Home
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  // ===== Estilo do Menu / Navbar =====
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
  // ===== Estilo da Barra de Busca =====
  searchInput: {
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.background,
  },
  // ===== Estilo dos Cards dos Itens =====
  card: {
    backgroundColor: colors.neutral,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    // Sombra leve para destacar o card (opcional)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  // Mensagem para quando não houver itens cadastrados
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
