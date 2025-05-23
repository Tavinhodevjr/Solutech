import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: colors.background,
    fontSize: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },

  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: colors.background,
  },

  card: {
    width: '100%',
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },

  chartTitle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 16,
    alignSelf: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },

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
