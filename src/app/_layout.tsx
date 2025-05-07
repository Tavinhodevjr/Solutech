// src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="landingPage/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="registerPage/index" options={{ headerShown: false }} />
      <Stack.Screen name="addItem/index" options={{ headerShown: false }} />
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard/index" options={{ headerShown: false }} />
      <Stack.Screen name="myItens/index" options={{ headerShown: false }} />
      <Stack.Screen name="editItens/index" options={{ headerShown: false }} />
      <Stack.Screen name="debug/index" options={{ headerShown: false }} />
      <Stack.Screen name="negotiations/index" options={{ headerShown: false }} />
    </Stack>
  );
}
