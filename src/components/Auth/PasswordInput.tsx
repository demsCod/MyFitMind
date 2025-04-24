import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordInput({ password, setPassword }: { password: string, setPassword: (v: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-2 relative">
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
  );
}
