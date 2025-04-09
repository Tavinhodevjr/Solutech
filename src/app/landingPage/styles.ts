import { StyleSheet } from 'react-native';
// Importa a paleta de cores definida previamente (os caminhos são ajustados de acordo com a estrutura do projeto)
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  // Container principal do ScrollView
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  /* ========================= Navbar Styles ========================= */
  navbar: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection:'row',
    alignItems: 'stretch'
  },
  navLinkText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  /* ========================= About Section Styles ========================= */
  aboutSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    color: colors.textPrimary,
  },
  blueContainer: {
    backgroundColor: colors.primary, // Utiliza a cor principal para o fundo verde
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    elevation: 3,
  },
  blueContent: {
    alignItems: 'center',
  },
  aboutLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  readyText: {
    textAlign: 'justify',
    fontWeight: 'thin',
    fontSize: 16,
    color: '#FFFFFF', // Cor branca para contraste
    marginBottom: 20,
  },
  wasteImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 8
  },
  transformText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginVertical: 20,
  },
  aboutHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.primary,
    marginVertical: 10,
  },
  aboutDescription: {
    textAlign: 'justify',
    fontSize: 16,
    color: colors.neutral,
    marginVertical: 0,
  },
  /* ========================= Services Section Styles ========================= */
  servicesSection: {
    padding: 20,
  },
  servicesHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8
  },
  cardNumber: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  cardDescription: {
    textAlign: 'justify',
    fontSize: 14,
    color: colors.textSecondary,
  },
  /* ========================= Contact Section Styles ========================= */
  contactSection: {
    padding: 20,
  },
  contactHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  contactDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  form: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  /* ========================= Footer Section Styles ========================= */
  footer: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  footerLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  footerColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  footerLink: {
    color: '#FFFFFF',
    fontSize: 10,
    marginBottom: 3,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral,
    marginTop: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  footerCopyright: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
