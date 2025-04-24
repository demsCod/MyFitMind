import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from '../../../components/ui/BottomSheet';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    search: string;
    bodyPart: string;
    target: string;
    equipment: string;
    level: string;
  };
  filterOptions: {
    bodyParts: string[];
    targets: string[];
    equipments: string[];
    levels: string[];
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  filterOptions,
  onFilterChange,
  onReset
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Filtrer les exercices"
    >
      <ScrollView className="max-h-[500px]">
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-white font-body-semibold mb-3">Partie du corps</Text>
            <View className="flex-row flex-wrap gap-2">
              {filterOptions.bodyParts.map(part => (
                <TouchableOpacity
                  key={part}
                  className={`py-2 px-3 rounded-md ${filters.bodyPart === part ? 'bg-accent' : 'bg-gray-700'}`}
                  onPress={() => onFilterChange('bodyPart', filters.bodyPart === part ? '' : part)}
                >
                  <Text className="text-white">{part}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-white font-body-semibold mb-3">Muscle cible</Text>
            <View className="flex-row flex-wrap gap-2">
              {filterOptions.targets.map(target => (
                <TouchableOpacity
                  key={target}
                  className={`py-2 px-3 rounded-md ${filters.target === target ? 'bg-accent' : 'bg-gray-700'}`}
                  onPress={() => onFilterChange('target', filters.target === target ? '' : target)}
                >
                  <Text className="text-white">{target}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View className="mb-6">
            <Text className="text-white font-body-semibold mb-3">Équipement</Text>
            <View className="flex-row flex-wrap gap-2">
              {filterOptions.equipments.map(equipment => (
                <TouchableOpacity
                  key={equipment}
                  className={`py-2 px-3 rounded-md ${filters.equipment === equipment ? 'bg-accent' : 'bg-gray-700'}`}
                  onPress={() => onFilterChange('equipment', filters.equipment === equipment ? '' : equipment)}
                >
                  <Text className="text-white">{equipment}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Nouveau filtre par niveau */}
          <View className="mb-6">
            <Text className="text-white font-body-semibold mb-3">Niveau</Text>
            <View className="flex-row flex-wrap gap-2">
              {filterOptions.levels.map(level => (
                <TouchableOpacity
                  key={level}
                  className={`py-2 px-3 rounded-md ${filters.level === level ? 'bg-accent' : 'bg-gray-700'}`}
                  onPress={() => onFilterChange('level', filters.level === level ? '' : level)}
                >
                  <Text className="text-white">
                    {level === 'beginner' ? 'Débutant' : 
                     level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="py-3 px-6 rounded-lg bg-gray-700"
              onPress={onReset}
            >
              <Text className="text-white font-body-medium">Réinitialiser</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="py-3 px-6 rounded-lg bg-accent"
              onPress={onClose}
            >
              <Text className="text-white font-body-medium">Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

export default FilterModal;