import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { authenticateUser, setCurrentUser } from '../../config/database';

export default function Login() {
  const router = useRouter();

  // Campos de formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado do alert customizado
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '' });

  // Mostra alert customizado
  const showAlert = (title: string, message: string, onConfirm?: () => void) => {
    setAlertModal({ visible: true, title, message, onConfirm });
  };

  // Fecha o alert
  const closeAlert = () => {
    setAlertModal({ visible: false, title: '', message: '', onConfirm: undefined });
  };

  // Login handler
  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      showAlert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }
    const isValid = await authenticateUser(email, senha);
    if (!isValid) {
      showAlert('Erro', 'Usuário não cadastrado ou dados incorretos.');
      return;
    }
    await setCurrentUser(email);
    showAlert('Sucesso', 'Login efetuado com sucesso!', () => router.push('/home'));
  };

  return (
    <>
      {/* Top bar com voltar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/landingPage')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Login</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/images/logoBranca.png')}
          style={styles.logo}
        />

        <View style={styles.formContainer}>
          <Text style={styles.header}>ENTRE NA SUA CONTA</Text>

          <View style={styles.inputField}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Digite sua senha"
              style={styles.input}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signin}>
            <Text style={styles.signinText}>
              Não tem uma conta?
              <Text
                style={styles.linkText}
                onPress={() => router.push('/registerPage')}
              >
                {' '}Cadastre
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Alert Customizado */}
      <Modal
        visible={alertModal.visible}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <TouchableWithoutFeedback onPress={closeAlert}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.alertModal}>
          <Text style={styles.alertTitle}>{alertModal.title}</Text>
          <Text style={styles.alertMessage}>{alertModal.message}</Text>
          <TouchableOpacity style={styles.alertButton} onPress={() => {
            closeAlert();
            alertModal.onConfirm?.();
          }}>
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
