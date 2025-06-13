import React from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { CalendarIcon } from 'react-native-heroicons/outline';

export default function Header() {
 
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        <View className="items-start ml-5 justify-center py-4 mt-5">
            <Text className="text-white text-3xl font-body-semibold">Workout</Text>   
            <Text className="text-grey/40 text-xl font-body ">{formattedDate}</Text>
            <View className="flex-row items-center justify-between w-full">
            <View className="flex-row items-center justify-start mt-2">
             
            </View>
                
            </View>

        </View>
    );
}