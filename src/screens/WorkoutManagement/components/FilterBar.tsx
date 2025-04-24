import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterBarProps {
  filters: { search: string; target: string; equipment: string };
  onFilterChange: (key: string, value: string) => void;
  filterOptions: { targets: string[]; equipments: string[]; levels?: string[] };
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters,
  onFilterChange,
  filterOptions,
}) => {
  const [showTargetMenu, setShowTargetMenu] = useState(false);
  const [showEquipmentMenu, setShowEquipmentMenu] = useState(false);
  
  return (
    <View className="px-4 mb-4">
      {/* Barre de recherche */}
      <View className="flex-row items-center bg-gray-800 rounded-lg px-3 py-2 mb-5">
        <Ionicons name="search-outline" size={24} color="#999" />
        <TextInput
          placeholder="Rechercher un exercice..."
          placeholderTextColor="#999"
          className="flex-1 ml-2 text-white font-body"
          value={filters.search}
          onChangeText={(text) => onFilterChange('search', text)}
        />
        {filters.search !== '' && (
          <TouchableOpacity onPress={() => onFilterChange('search', '')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Les deux sélecteurs côte à côte */}
      <View className="flex-row justify-between">
        {/* Sélecteur de muscle */}
        <View className="flex-1 mr-2">
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-800 rounded-lg px-4 py-3"
            onPress={() => setShowTargetMenu(true)}
          >
            <Text className="text-white font-body truncate" numberOfLines={1}>
              {filters.target || "Tous les muscles"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>
          
          {/* Menu déroulant pour les muscles */}
          <Modal
            transparent={true}
            visible={showTargetMenu}
            animationType="fade"
            onRequestClose={() => setShowTargetMenu(false)}
          >
            <TouchableOpacity
              className="flex-1 bg-black/50"
              activeOpacity={1}
              onPress={() => setShowTargetMenu(false)}
            >
              <View className="bg-gray-900 m-4 mt-20 rounded-xl max-h-[60%] overflow-hidden">
                <Text className="p-4 text-white font-title text-lg border-b border-gray-800">
                  Sélectionner un muscle
                </Text>
                
                <ScrollView>
                  <TouchableOpacity
                    className={`px-4 py-3 border-b border-gray-800 ${filters.target === '' ? 'bg-accent/20' : ''}`}
                    onPress={() => {
                      onFilterChange('target', '');
                      setShowTargetMenu(false);
                    }}
                  >
                    <Text className="text-white font-body">Tous les muscles</Text>
                  </TouchableOpacity>
                  
                  {filterOptions.targets.map(target => (
                    <TouchableOpacity
                      key={target}
                      className={`px-4 py-3 border-b border-gray-800 ${filters.target === target ? 'bg-accent/20' : ''}`}
                      onPress={() => {
                        onFilterChange('target', target);
                        setShowTargetMenu(false);
                      }}
                    >
                      <Text className="text-white font-body">{target}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        
        {/* Sélecteur d'équipement */}
        <View className="flex-1 ml-2">
          <TouchableOpacity 
            className="flex-row items-center justify-between bg-gray-800 rounded-lg px-4 py-3"
            onPress={() => setShowEquipmentMenu(true)}
          >
            <Text className="text-white font-body truncate" numberOfLines={1}>
              {filters.equipment || "Tous les équipements"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>
          
          {/* Menu déroulant pour les équipements */}
          <Modal
            transparent={true}
            visible={showEquipmentMenu}
            animationType="fade"
            onRequestClose={() => setShowEquipmentMenu(false)}
          >
            <TouchableOpacity
              className="flex-1 bg-black/50"
              activeOpacity={1}
              onPress={() => setShowEquipmentMenu(false)}
            >
              <View className="bg-gray-900 m-4 mt-20 rounded-xl max-h-[60%] overflow-hidden">
                <Text className="p-4 text-white font-title text-lg border-b border-gray-800">
                  Sélectionner un équipement
                </Text>
                
                <ScrollView>
                  <TouchableOpacity
                    className={`px-4 py-3 border-b border-gray-800 ${filters.equipment === '' ? 'bg-accent/20' : ''}`}
                    onPress={() => {
                      onFilterChange('equipment', '');
                      setShowEquipmentMenu(false);
                    }}
                  >
                    <Text className="text-white font-body">Tous les équipements</Text>
                  </TouchableOpacity>
                  
                  {filterOptions.equipments.map(equipment => (
                    <TouchableOpacity
                      key={equipment}
                      className={`px-4 py-3 border-b border-gray-800 ${filters.equipment === equipment ? 'bg-accent/20' : ''}`}
                      onPress={() => {
                        onFilterChange('equipment', equipment);
                        setShowEquipmentMenu(false);
                      }}
                    >
                      <Text className="text-white font-body">{equipment}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default FilterBar;