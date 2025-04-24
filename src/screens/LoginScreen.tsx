import { View, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';
import LoginHeader from '~/components/Auth/LoginHeader';
import LoginForm from '~/components/Auth/LoginForm';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const logoImage = require('../../assets/brainlogo.png');
  
  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      alert('Connexion réussie !');

    } catch (error) {
      console.error('Error signing in:', error);
      alert('Erreur de connexion. Veuillez vérifier vos identifiants.');
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
            <Image
              source={logoImage}
              className="w-64 h-48 self-center mb-6"
              resizeMode="contain"
            />
            <LoginHeader />
            {/* logo */}
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              signIn={signIn}
              onSignUpPress={() => navigation.navigate('SignUp')} // 👈 ajout ici
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
