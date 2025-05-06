import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // redireciona imediatamente para /landingPage
  return <Redirect href="/landingPage" />;
}
