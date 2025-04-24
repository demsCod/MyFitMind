import React from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <TouchableOpacity 
          className="absolute inset-0" 
          onPress={onClose} 
          activeOpacity={1}
        />
        <View className="bg-gray-900 rounded-t-3xl max-h-[80%]">
          <View className="flex-row items-center justify-between px-6 pt-5 pb-2 border-b border-gray-800">
            <Text className="text-white font-title text-lg">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="px-2">
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};