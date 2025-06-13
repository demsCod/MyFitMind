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
        className="rounded-xl p-4 mb-1" 
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          
          {/* Informations sur l'exercice */}
          <View className="flex-1 mb-1">
        {/* Image de l'exercice */}
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => setModalVisible(true)} 
            className="-ml-auto"
          >
            <Image
          source={exercise.image}
          style={{ width: 60, height: 60, borderRadius: 5 }}
          onError={() => setImageError(true)}
            />
          </TouchableOpacity>
          <View className="mt-1 ml-2">
            <Text className="text-white font-body text-xl">{exercise.name}</Text>
            <View className="mt-1">
          {exercise.target && (
            <View className="mb-1">
              <Text className="text-gray-300 text-sm">{exercise.target.toUpperCase()}</Text>
            </View>
          )}
            </View>
          </View>
          <TouchableOpacity onPress={onToggleSelect} className='ml-auto'>
            <Ionicons 
              name={isSelected ? "checkbox-outline" : "square-outline"} 
              size={24} 
              color={isSelected ? "white" : "grey"} 
            />
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
              <View style={{ borderRadius: 10, marginTop: 20, width: '100%', paddingHorizontal: 16 }}>
            <Text className="text-white text-center mb-2 font-body-semibold text-3xl">
              {exercise.name}
            </Text>
            <Image
              source={exercise.image}
              style={{ width: '100%', height: '40%', borderRadius: 10 }}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <Text className="text-red-500 text-center mt-2">
                Erreur de chargement de l'image
              </Text>
            )}
            <View >
            <ScrollView >
              <Text className="text-grey text-2lg font-body mt-2">INSTRUCTIONS </Text>
              {exercise.instructions && exercise.instructions.map((instruction, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Text className="text-white text-sm mr-2 ">{index + 1}.</Text>
                  <Text className="text-white text-sm flex-1">{instruction}</Text>
                </View>
              ))}
              <Text className="text-white text-xl font-body mt-2">Muscles secondaires :</Text>
              {exercise.secondaryMuscles && exercise.secondaryMuscles.map((muscle, index) => (
                <Text key={index} className="text-gray-300 text mb-2">
              {muscle}
                </Text>
              ))}
            </ScrollView>
            </View>
              </View>
          </View>
            </Modal>
          )}
        </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseCard;