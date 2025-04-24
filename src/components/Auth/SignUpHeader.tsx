import React from 'react';
import { View } from 'react-native';
import Title from '~/components/Typography/Title';
import Subtitle from '~/components/Typography/Subtitle';

export default function SignUpHeader() {
  return (
    <View className="mb-8">
      <Title className="text-white text-center mb-2">Créer un compte</Title>
      <Subtitle className="text-white/80 text-center">
        Rejoins la team et commence ton évolution dès aujourd'hui !
      </Subtitle>
    </View>
  );
}