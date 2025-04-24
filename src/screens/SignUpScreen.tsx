import React, { useState } from 'react';
import { View, Platform, Image } from 'react-native';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import SignUpHeader from '~/components/Auth/SignUpHeader';
import SignUpForm from '~/components/Auth/SignUpForm';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const logoImage = require('../../assets/brainlogo.png'); // Assurez-vous que le chemin est correct

  const signUp = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Ne pas naviguer ici - le contexte d'auth s'en chargera
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Erreur lors de l\'inscription. Vérifie tes infos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-background">
      <SafeAreaView className="flex-1 bg-background">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 px-6"
        >
          <View className="flex-1 justify-center">
            {/* Logo */}
            <Image
              source={logoImage}
              className="w-64 h-48 self-center mb-6"
              resizeMode="contain"
            />
            
            {/* Header */}
            <SignUpHeader />
            
            {/* Formulaire */}
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              signUp={signUp}
              loading={loading}
              onLoginPress={() => navigation.navigate('Login')}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
