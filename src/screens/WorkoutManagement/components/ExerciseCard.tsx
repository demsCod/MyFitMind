import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
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

  return (
    <View>
      <TouchableOpacity 
        onPress={onToggleSelect}
        className={`rounded-xl p-4 mb-1 ${isSelected ? 'border border-accent' : ''}`}
        activeOpacity={0.7}
      >
        {/* Indicateur de sélection */}
        {isSelected && (
          <View className="absolute top-2 right-2 z-10 bg-accent rounded-full p-1">
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        )}
        
        {/* Layout avec image à gauche et texte à droite */}
        <View className="flex-row items-center">
          {/* Image container */}
          <View className="h-[120px] w-[120px] rounded-lg overflow-hidden ">
            {!imageError && exercise.gifUrl ? (
              <Image
                source={{ uri: exercise.gifUrl }}
                className="w-full h-full"
                resizeMode="contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Ionicons name="barbell-outline" size={24} color="#666" />
              </View>
            )}
          </View>
          
          {/* Informations sur l'exercice */}
          <View className="flex-1 ml-5 mb-10">
            <Text className="text-white font-title text-xl">{exercise.name}</Text>
            
            <View className="flex-row flex-wrap mt-1">
              {exercise.target && (
                <View className="bg-gray-700/60 rounded-md px-2 py-1 mr-2 mb-1">
                  <Text className="text-gray-300 text-xs">{exercise.target}</Text>
                </View>
              )}
              
              {exercise.equipment && (
                <View className="bg-gray-700/60 rounded-md px-2 py-1 mb-1">
                  <Text className="text-gray-300 text-xs">{exercise.equipment}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Configuration qui apparaît quand l'exercice est sélectionné */}
      {isSelected && (
        <View className="px-4 pb-4 pt-1 mb-3 bg-grey/30 rounded-b-xl border-t border-gray-800">
          {/* Toggle pour basculer entre répétitions et temps */}
          <View className="flex-row justify-end mb-2">
            <TouchableOpacity 
              onPress={toggleTimeMode}
              className="flex-row items-center"
            >
              <Text className="text-white mr-2 text-xs font-body">
                {localConfig.isTimeBased ? "Mode temps" : "Mode répétitions"}
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
              <Text className="text-white text-xs mb-1 font-body">Séries</Text>
              <View className="flex-row items-center bg-gray-800 rounded-lg h-8">
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
              <Text className="text-white text-xs mb-1 font-body">
                {localConfig.isTimeBased ? "Durée (sec)" : "Répétitions"}
              </Text>
              <View className="flex-row items-center bg-gray-800 rounded-lg h-8">
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
            <Text className="text-white text-xs mb-1 font-body">Repos entre séries (sec)</Text>
            <View className="flex-row items-center bg-gray-800 rounded-lg h-8">
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