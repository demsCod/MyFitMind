import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function EmailInput({ email, setEmail }: { email: string, setEmail: (v: string) => void }) {
  return (
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
  );
}
