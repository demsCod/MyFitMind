import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
    return (
        <View className="items-start ml-5 justify-center py-4">
            <Text className="text-white text-3xl font-body-semibold ">Own Your</Text>
            <Text className="text-white text-3xl font-body-semibold">Fitness Mindset</Text>   
            <Text className="text-white text-lg font-body-semibold">Your training, your results</Text>
            <View className="absolute top-4 right-5">
                <View className="bg-accent rounded-full h-10 w-10 items-center justify-center">
                    <Text className="font-body-semibold">MD</Text>
                </View>
            </View>
        </View>
    );
}