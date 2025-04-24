import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../../hooks/useExerciseGithubDB'; // Modifié pour utiliser le nouveau type

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  isSelected, 
  onToggleSelect 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity 
      onPress={onToggleSelect}
      className={`bg-gray-800 rounded-xl p-4 mb-4 ${isSelected ? 'border-2 border-accent' : ''}`}
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
        <View className="h-[80px] w-[80px] rounded-lg overflow-hidden bg-gray-900">
          {!imageError && exercise.gifUrl ? (
            <Image
              source={{ uri: exercise.gifUrl }}
              className="w-full h-full"
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Ionicons name="barbell-outline" size={24} color="#666" />
            </View>
          )}
        </View>
        
        {/* Informations sur l'exercice */}
        <View className="flex-1 ml-3">
          <Text className="text-white font-body-semibold text-base">{exercise.name}</Text>
          
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
      
      {/* Niveau de difficulté */}
      {exercise.level && (
        <View className="mt-2 flex-row items-center">
          <Text className="text-gray-400 text-xs mr-1">Niveau:</Text>
          <View className={`px-2 py-0.5 rounded ${
            exercise.level === 'beginner' ? 'bg-green-800/40' : 
            exercise.level === 'intermediate' ? 'bg-yellow-800/40' : 
            'bg-red-800/40'
          }`}>
            <Text className="text-white text-xs">
              {exercise.level === 'beginner' ? 'Débutant' : 
               exercise.level === 'intermediate' ? 'Intermédiaire' : 
               'Avancé'}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ExerciseCard;