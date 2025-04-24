import { View } from 'react-native';
import Title from '~/components/Typography/Title';
import Subtitle from '~/components/Typography/Subtitle';

export default function LoginHeader() {
  return (
    <View className="mb-8">
      <Title className="text-white text-center mb-2">Bienvenue</Title>
      <Subtitle className="text-white/80 text-center">
        Heureux de te revoir, l'athlète. Prêt à dépasser tes limites ?
      </Subtitle>
    </View>
  );
}
