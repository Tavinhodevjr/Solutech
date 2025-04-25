// src/app/debug/index.tsx
import React from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Debug() {
  const resetStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Sucesso', 'AsyncStorage limpo com sucesso');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao limpar AsyncStorage');
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Limpar AsyncStorage" onPress={resetStorage} />
    </View>
  );
}
