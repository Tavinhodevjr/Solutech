import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  getUserProfile,
  saveUserProfile,
  changePassword,
  UserProfile,
} from '../../config/userProfile';
import { getCurrentUser, getUsers } from '../../config/database';
import { styles } from './styles';

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    avatarUri: undefined,
  });
  const [original, setOriginal] = useState<UserProfile | null>(null);

  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // Carrega perfil ao montar
  useEffect(() => {
    (async () => {
      let stored = await getUserProfile();
      if (!stored) {
        const email = await getCurrentUser();
        if (email) {
          const users = await getUsers();
          const u = users.find(u => u.email === email);
          if (u) {
            stored = {
              nome: u.nome,
              email: u.email,
              empresa: u.empresa,
              telefone: u.telefone,
              avatarUri: undefined,
            };
          }
        }
      }
      if (stored) {
        setProfile(stored);
        setOriginal(stored);
      }
    })();
  }, []);

  const isModified =
    original !== null &&
    (profile.nome !== original.nome ||
      profile.empresa !== original.empresa ||
      profile.telefone !== original.telefone ||
      profile.avatarUri !== original.avatarUri ||
      newPwd.length > 0);

  
  const handleUpdate = async () => {
    if (!profile.nome.trim() || !profile.email.trim()) {
      return Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
    }
    if (newPwd) {
      if (newPwd !== confirmPwd) {
        return Alert.alert('Erro', 'As senhas não coincidem.');
      }
      try {
        await changePassword(profile.email, newPwd);
      } catch {
        return Alert.alert('Erro', 'Não foi possível atualizar a senha.');
      }
    }
    try {
      await saveUserProfile(profile);
      setOriginal(profile);
      setNewPwd('');
      setConfirmPwd('');
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  };

  return (
    <>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Resumo */}
          <View style={styles.card}>
            <Text style={styles.summaryTitle}>Olá, {profile.nome || 'usuário'}</Text>
            <Text style={styles.summaryText}>E-mail: {profile.email}</Text>
            <Text style={styles.summaryText}>Empresa: {profile.empresa}</Text>
            <Text style={styles.summaryText}>Telefone: {profile.telefone}</Text>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            <View style={styles.inputField}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={profile.nome}
                onChangeText={nome => setProfile({ ...profile, nome })}
                placeholder="Digite seu nome"
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Empresa</Text>
              <TextInput
                style={styles.input}
                value={profile.empresa}
                onChangeText={empresa => setProfile({ ...profile, empresa })}
                placeholder="Digite sua empresa"
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                value={profile.telefone}
                onChangeText={telefone =>
                  setProfile({ ...profile, telefone: telefone
                    .replace(/\D/g, '')
                    .replace(/^(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d)(\d{4})$/, '$1-$2')
                  })
                }
                keyboardType="phone-pad"
                placeholder="(11) 9 1234-5678"
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                value={newPwd}
                onChangeText={setNewPwd}
                placeholder="Digite nova senha"
                secureTextEntry
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                value={confirmPwd}
                onChangeText={setConfirmPwd}
                placeholder="Repita a senha"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.button, !isModified && styles.buttonDisabled]}
              onPress={handleUpdate}
              disabled={!isModified}
            >
              <Text style={[styles.buttonText, !isModified && styles.buttonTextDisabled]}>
                Atualizar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© 2025 Solutech. Todos os direitos reservados.</Text>
      </View>
    </>
  );
}
