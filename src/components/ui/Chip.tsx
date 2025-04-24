import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChipProps {
  label: string;
  onClose?: () => void;
  color?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, onClose, color = '#3772FF' }) => {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-full px-3 py-1.5">
      <Text className="text-white text-sm font-body mr-1">{label}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close-circle" size={16} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};