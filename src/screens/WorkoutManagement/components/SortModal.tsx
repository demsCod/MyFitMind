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
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Trier les exercices"
    >
      <View className="p-4">
        <TouchableOpacity
          className={`flex-row items-center py-3 px-4 rounded-md mb-2 ${sortOption === 'name_asc' ? 'bg-accent' : 'bg-gray-800'}`}
          onPress={() => handleSort('name_asc')}
        >
          <Ionicons name="text-outline" size={20} color="white" />
          <Text className="text-white ml-3">Nom (A-Z)</Text>
          {sortOption === 'name_asc' && (
            <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 'auto' }} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-row items-center py-3 px-4 rounded-md mb-2 ${sortOption === 'name_desc' ? 'bg-accent' : 'bg-gray-800'}`}
          onPress={() => handleSort('name_desc')}
        >
          <Ionicons name="text-outline" size={20} color="white" />
          <Text className="text-white ml-3">Nom (Z-A)</Text>
          {sortOption === 'name_desc' && (
            <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 'auto' }} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-row items-center py-3 px-4 rounded-md mb-2 ${sortOption === 'target_asc' ? 'bg-accent' : 'bg-gray-800'}`}
          onPress={() => handleSort('target_asc')}
        >
          <Ionicons name="body-outline" size={20} color="white" />
          <Text className="text-white ml-3">Muscle (A-Z)</Text>
          {sortOption === 'target_asc' && (
            <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 'auto' }} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-row items-center py-3 px-4 rounded-md mb-2 ${sortOption === 'equipment_asc' ? 'bg-accent' : 'bg-gray-800'}`}
          onPress={() => handleSort('equipment_asc')}
        >
          <Ionicons name="barbell-outline" size={20} color="white" />
          <Text className="text-white ml-3">Équipement (A-Z)</Text>
          {sortOption === 'equipment_asc' && (
            <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 'auto' }} />
          )}
        </TouchableOpacity>
        
        {/* Nouvelle option de tri par niveau */}
        <TouchableOpacity
          className={`flex-row items-center py-3 px-4 rounded-md mb-2 ${sortOption === 'level_asc' ? 'bg-accent' : 'bg-gray-800'}`}
          onPress={() => handleSort('level_asc')}
        >
          <Ionicons name="trending-up-outline" size={20} color="white" />
          <Text className="text-white ml-3">Niveau (Débutant à Avancé)</Text>
          {sortOption === 'level_asc' && (
            <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 'auto' }} />
          )}
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default SortModal;