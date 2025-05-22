import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
    return (
        <View className="items-start ml-5 justify-center py-4 mt-5">
            <Text className="text-white text-3xl font-body-semibold">MyFitMind</Text>   
            <Text className="text-white text-lg font-body-semibold">Your training, your results</Text>
        </View>
    );
}