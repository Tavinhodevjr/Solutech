// src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Tela de Landing Page */}
      <Stack.Screen name="landingPage/index" options={{ headerShown: false }} />
      
      {/* Tela de Login */}
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      
      {/* Tela de Cadastro (Quero me conectar) */}
      <Stack.Screen name="registerPage/index" options={{ headerShown: false }} />
      
      {/* Tela de cadastro dos itens */}
      <Stack.Screen name="addItem/index" options={{ headerShown: false }} />
      
      {/* Tela principal (Home) */}
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
    </Stack>
  );
}
