import { View, Text, TouchableOpacity } from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  signIn,
  loading = false,
  onSignUpPress,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading?: boolean;
  onSignUpPress: () => void;
}) {
  return (
    <View className="w-full">
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />

      <TouchableOpacity className="self-end mb-6">
        <Text className="text-accent font-body-medium">Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full h-12 bg-accent rounded-lg items-center justify-center shadow-md"
        onPress={signIn}
      >
        <Text className="text-white font-body-bold text-base">Se connecter</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center mt-6">
        <Text className="text-white/80 font-body">Pas encore de compte ? </Text>
        <TouchableOpacity
          onPress={onSignUpPress} disabled={loading}>
          <Text className="text-accent font-body-bold">S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
