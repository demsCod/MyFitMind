import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../../hooks/useExerciseGithubDB';

// Type pour la configuration d'exercice
export interface ExerciseConfig {
  sets: string;
  reps: string;
  duration: string; // en secondes
  isTimeBased: boolean;
  restTime: string; // temps de repos en secondes
}

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onToggleSelect: () => void;
  config?: ExerciseConfig;
  onConfigChange?: (config: ExerciseConfig) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  isSelected, 
  onToggleSelect,
  config,
  onConfigChange
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Initialiser la configuration locale si non fournie
  const [localConfig, setLocalConfig] = useState<ExerciseConfig>(config || {
    sets: '3',
    reps: '10',
    duration: '30',
    isTimeBased: false,
    restTime: '60' // 60 secondes de repos par défaut
  });
  
  // Gestion du changement de configuration
  const handleConfigChange = (key: keyof ExerciseConfig, value: string | boolean) => {
    const updatedConfig = { ...localConfig, [key]: value };
    setLocalConfig(updatedConfig);
    
    // Propager le changement au parent si le callback existe
    if (onConfigChange) {
      onConfigChange(updatedConfig);
    }
  };

  // Basculer entre le mode répétitions et le mode temps
  const toggleTimeMode = () => {
    handleConfigChange('isTimeBased', !localConfig.isTimeBased);
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity 
        onPress={onToggleSelect}
        className={`rounded-xl p-4 mb-1 ${isSelected ? 'border border-accent' : ''}`}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          
          {/* Informations sur l'exercice */}
          <View className="flex-1  mb-1">
            {/* Image de l'exercice */}
            <View className="flex-row items-center">
              <Text className="text-white font-body-semibold text-xl">{exercise.name}</Text>
                <TouchableOpacity 
                onPress={() => setModalVisible(true)} 
                className="ml-auto"
                >
                <Ionicons name="eye-outline" size={20} color="white" />
                </TouchableOpacity>

              {/* Modal for displaying the image */}
              {modalVisible && (
                <Modal
                  transparent={false}
                  animationType="slide"
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                  presentationStyle="formSheet"
                >
                  <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="absolute top-4 right-4 z-10 p-1"
                  >
                  <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                  <View className="flex-1 bg-background">
                  <ScrollView style={{ flex: 1 }}>
                    <View style={{ borderRadius: 10, marginTop: 20, width: '100%', paddingHorizontal: 16 }}>
                    <Text className="text-white text-center mb-2 font-body-semibold text-3xl">
                      {exercise.name}
                    </Text>
                    <Image
                      source={exercise.image}
                      style={{ width: '100%', height: '50%', borderRadius: 10 }}
                      onError={() => setImageError(true)}
                    />
                    {imageError && (
                      <Text className="text-red-500 text-center mt-2">
                      Erreur de chargement de l'image
                      </Text>
                    )}
                    <View style={{ width: '100%', paddingHorizontal: 16 }}>
                      <Text className="text-white text-xl font-body mt-2">Instructions :</Text>
                      {exercise.instructions && exercise.instructions.map((instruction, index) => (
                      <Text key={index} className="text-gray-300 text mb-2">
                        {index + 1}. {instruction}
                      </Text>
                      ))}
                      <Text className="text-white text-xl font-body mt-2">Muscles secondaires :</Text>
                      {exercise.secondaryMuscles && exercise.secondaryMuscles.map((muscle, index) => (
                      <Text key={index} className="text-gray-300 text mb-2">
                        {muscle}
                      </Text>
                      ))}
                    </View>
                    </View>
                  </ScrollView>
                  </View>
                </Modal>

              )}
            </View>
            <View className="flex-row flex-wrap mt-1">
              {exercise.target && (
                <View className="bg-grey/20 rounded-md px-2 py-1 mr-2 mb-1">
                  <Text className="text-gray-300 text-lg">{exercise.target}</Text>
                </View>
              )}
              
              {exercise.equipment && (
                <View className="bg-grey/20 rounded-md px-2 py-1 mb-1">
                  <Text className="text-gray-300 text-lg">{exercise.equipment}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Configuration qui apparaît quand l'exercice est sélectionné */}
      {isSelected && (
        <View className="px-4 pb-4 pt-1 mb-3  rounded-b-xl">
          {/* Toggle pour basculer entre répétitions et temps */}
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity 
              onPress={toggleTimeMode}
              className="flex-row items-center"
            >
              <Text className="text-white mr-2 text-xs font-body-semibold">
                {localConfig.isTimeBased ? "temps" : "répétitions"}
              </Text>
              <Ionicons 
                name={localConfig.isTimeBased ? "timer-outline" : "repeat-outline"} 
                size={16} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Configuration des séries et répétitions/temps */}
          <View className="flex-row justify-between mb-2">
            {/* Séries */}
            <View className="flex-1 mr-3">
              <Text className="text-white text-xs mb-1 font-body-semibold">Séries</Text>
              <View className="flex-row items-center bg-grey/20 rounded-lg h-8">
                <TextInput
                  className="flex-1 p-1 text-white text-center"
                  value={localConfig.sets}
                  onChangeText={(text) => handleConfigChange('sets', text)}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            
            {/* Répétitions ou Durée */}
            <View className="flex-1">
              <Text className="text-white text-xs mb-1 font-body-semibold">
                {localConfig.isTimeBased ? "Durée (sec)" : "Répétitions"}
              </Text>
              <View className="flex-row items-center bg-grey/20 rounded-lg h-8">
                <TextInput
                  className="flex-1 p-1 text-white text-center"
                  value={localConfig.isTimeBased ? localConfig.duration : localConfig.reps}
                  onChangeText={(text) => 
                    handleConfigChange(localConfig.isTimeBased ? 'duration' : 'reps', text)
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>
          
          {/* Temps de repos */}
          <View>
            <Text className="text-white text-xs mb-1 font-body-semibold">Repos entre séries (sec)</Text>
            <View className="flex-row items-center bg-grey/20 rounded-lg h-8">
              <TextInput
                className="flex-1 p-1 text-white text-center"
                value={localConfig.restTime}
                onChangeText={(text) => handleConfigChange('restTime', text)}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExerciseCard;