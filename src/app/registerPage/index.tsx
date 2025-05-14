import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { saveUser } from '../../config/database';

export default function RegisterPage() {
  const router = useRouter();

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefone, setTelefone] = useState('');

  // Estado do alert customizado
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '' });

  // Exibe alert customizado
  const showAlert = (title: string, message: string, onConfirm?: () => void) => {
    setAlertModal({ visible: true, title, message, onConfirm });
  };
  const closeAlert = () => {
    setAlertModal({ visible: false, title: '', message: '', onConfirm: undefined });
  };

  // Máscara simples para telefone
  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  // Validação de e-mail
  const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  // Envio do formulário
  const handleSubmit = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !empresa.trim() || !telefone.trim()) {
      showAlert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    try {
      await saveUser({ nome, email, senha, empresa, telefone });
      showAlert('Sucesso', 'Cadastro realizado com sucesso!', () => router.push('/login'));
    } catch {
      showAlert('Erro', 'Ocorreu um problema ao salvar os dados.');
    }
  };

  return (
    <>
      {/* Top bar com botão de voltar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/landingPage')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Cadastrar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>CRIE SUA CONTA</Text>

          <View style={styles.inputField}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              placeholder="Digite seu nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              placeholder="Digite sua senha"
              style={styles.input}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Empresa:</Text>
            <TextInput
              placeholder="Digite o nome da empresa"
              style={styles.input}
              value={empresa}
              onChangeText={setEmpresa}
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Telefone:</Text>
            <TextInput
              placeholder="(11) 912345-6789"
              style={styles.input}
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={text => setTelefone(formatTelefone(text))}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>ENVIAR</Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => {
              closeAlert();
              alertModal.onConfirm?.();
            }}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
