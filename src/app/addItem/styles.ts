import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 80,
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topBarButton: {
    padding: 8,
  },
  topBarIcon: {
    fontSize: 20,
    color: colors.primary,
  },

  formBox: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.neutral,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },

  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: colors.primary,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
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
