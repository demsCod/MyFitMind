import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  signUp: () => Promise<void>;
  onLoginPress: () => void;
}

export default function SignUpForm({
  email,
  setEmail,
  password,
  setPassword,
  signUp,
  onLoginPress,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full">
      {/* Champ email */}
      <View className="mb-4 relative">
        <View className="absolute left-4 top-[14px] z-10">
          <Ionicons name="mail-outline" size={20} color="#A0A0A0" />
        </View>
        <TextInput
          className="w-full h-12 px-12 border border-gray-600 rounded-lg bg-gray-800 text-white"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Adresse email"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="none"
        />
      </View>

      {/* Champ mot de passe */}
      <View className="mb-6 relative">
        <View className="absolute left-4 top-[14px] z-10">
          <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" />
        </View>
        <TextInput
          className="w-full h-12 px-12 border border-gray-600 rounded-lg bg-gray-800 text-white"
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          className="absolute right-4 top-[14px] z-10"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      {/* Bouton inscription */}
      <TouchableOpacity
        className="w-full h-12 bg-accent rounded-lg items-center justify-center shadow-md"
        onPress={signUp}
      >
        <Text className="text-white font-body-bold text-base">S'inscrire</Text>
      </TouchableOpacity>

      {/* Retour à la connexion */}
      <View className="flex-row justify-center items-center mt-6">
        <Text className="text-white/80 font-body">Déjà un compte ? </Text>
        <TouchableOpacity onPress={onLoginPress}>
          <Text className="text-accent font-body-bold">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}