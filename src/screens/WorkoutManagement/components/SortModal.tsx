import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheet } from '../../../components/ui/BottomSheet';
import { Ionicons } from '@expo/vector-icons';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  sortOption: string;
  onSelectSort: (option: string) => void;
}

const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  sortOption,
  onSelectSort
}) => {
  const handleSort = (option: string) => {
    onSelectSort(option);
    onClose();
  };
  
  return (
    <></>
  )
};

export default SortModal;