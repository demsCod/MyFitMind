import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
      <View className="flex-row items-center bg-grey/20 rounded-2xl px-3 py-2 mb-5">
        <Ionicons name="search-outline" size={30} color="#999" />
        <TextInput
          placeholder="Recherche un exo"
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
            className="flex-row items-center justify-between bg-grey/20 rounded-lg px-4 py-3"
            onPress={() => setShowTargetMenu(true)}
          >
            <Text className="text-white font-body truncate" numberOfLines={1}>
              {filters.target || "All Muscles"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>

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
              <View className="bg-background m-4 mt-60 rounded-xl max-h-[40%] max-w-[50%] overflow-hidden">
             
              <ScrollView>
                <TouchableOpacity
                className={`px-4 py-3 border-b border-grey/20 ${filters.target === '' ? 'bg-accent/20' : ''}`}
                onPress={() => {
                  onFilterChange('target', '');
                  setShowTargetMenu(false);
                }}
                >
                <Text className="text-white font-body">All Muscles</Text>
                </TouchableOpacity>
                
                {filterOptions.targets.map(target => (
                <TouchableOpacity
                  key={target}
                  className={`px-4 py-3 border-b border-grey/20 ${filters.target === target ? 'bg-accent/20' : ''}`}
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
            className="flex-row items-center justify-between bg-grey/20 rounded-lg px-4 py-3"
            onPress={() => setShowEquipmentMenu(true)}
          >
            <Text className="text-white font-body truncate" numberOfLines={1}>
              {filters.equipment || "All Equipment"}
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
              
              <View className="bg-background ml-60 mt-60 rounded-xl max-h-[40%] max-w-[40%] overflow-hidden">                
                <ScrollView>
                  <TouchableOpacity
                    className={`px-4 py-3 border-b border-grey/20 ${filters.equipment === '' ? 'bg-accent/20' : ''}`}
                    onPress={() => {
                      onFilterChange('equipment', '');
                      setShowEquipmentMenu(false);
                    }}
                  >
                    <Text className="text-white font-body">All Equipment</Text>
                  </TouchableOpacity>
                  
                  {filterOptions.equipments.map(equipment => (
                    <TouchableOpacity
                      key={equipment}
                      className={`px-4 py-3 border-b border-grey/20 ${filters.equipment === equipment ? 'bg-accent/20' : ''}`}
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