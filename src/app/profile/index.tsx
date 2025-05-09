import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  getUserProfile,
  saveUserProfile,
  UserProfile,
} from '../../config/userProfile';
import { getCurrentUser, getUsers } from '../../config/database';
import { styles } from './styles';

export default function Profile() {
  const router = useRouter();

  // Estado com os dados que o usuário pode editar
  const [profile, setProfile] = useState<UserProfile>({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
  });
  // Cópia para comparar alterações
  const [original, setOriginal] = useState<UserProfile | null>(null);

  // Carrega perfil (do storage custom ou do cadastro) ao montar
  useEffect(() => {
    (async () => {
      // Tenta pegar o perfil salvo
      let stored = await getUserProfile();
      // Se não houver, busca no banco de usuários usando o e-mail logado
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

  // Define se algo mudou
  const isModified =
    original !== null &&
    (profile.nome !== original.nome ||
      profile.email !== original.email ||
      profile.empresa !== original.empresa ||
      profile.telefone !== original.telefone);

  // Salva (atualiza) perfil
  const handleUpdate = async () => {
    // Validação: nome e e-mail obrigatórios
    if (!profile.nome.trim() || !profile.email.trim()) {
      return Alert.alert('Erro', 'Nome e e-mail são obrigatórios.');
    }
    try {
      await saveUserProfile(profile);
      setOriginal(profile);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  };

  return (
    <>
      {/* Topbar com voltar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card de resumo */}
        <View style={styles.card}>
          <Text style={styles.summaryTitle}>
            Olá, {profile.nome || 'usuário'}
          </Text>
          <Text style={styles.summaryText}>E-mail: {profile.email}</Text>
          <Text style={styles.summaryText}>
            Empresa: {profile.empresa}
          </Text>
          <Text style={styles.summaryText}>
            Telefone: {profile.telefone}
          </Text>
        </View>

        {/* Formulário editável */}
        <View style={styles.formContainer}>
          {/* Nome */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={profile.nome}
              onChangeText={nome => setProfile({ ...profile, nome })}
              placeholder="Digite seu nome"
            />
          </View>

          {/* E-mail */}
          <View style={styles.inputField}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={email => setProfile({ ...profile, email })}
              keyboardType="email-address"
              placeholder="Digite seu e-mail"
            />
          </View>

          {/* Empresa */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Empresa</Text>
            <TextInput
              style={styles.input}
              value={profile.empresa}
              onChangeText={empresa => setProfile({ ...profile, empresa })}
              placeholder="Digite o nome da empresa"
            />
          </View>

          {/* Telefone */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={profile.telefone}
              onChangeText={telefone =>
                setProfile({ ...profile, telefone })
              }
              keyboardType="phone-pad"
              placeholder="Digite seu telefone"
            />
          </View>

          {/* Botão Atualizar */}
          <TouchableOpacity
            style={[
              styles.button,
              !isModified && styles.buttonDisabled,
            ]}
            onPress={handleUpdate}
            disabled={!isModified}
          >
            <Text
              style={[
                styles.buttonText,
                !isModified && styles.buttonTextDisabled,
              ]}
            >
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottombar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>
          © 2025 Solutech. Todos os direitos reservados.
        </Text>
      </View>
    </>
  );
}
