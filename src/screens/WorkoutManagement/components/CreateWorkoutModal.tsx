import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BottomSheet } from '../../../components/ui/BottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../../hooks/useExerciseGithubDB';
import { ExerciseConfig } from './ExerciseCard';

interface CreateWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
  workoutName: string;
  onChangeWorkoutName: (name: string) => void;
  selectedExercises: string[];
  exercisesList: Exercise[] | null;
  onToggleExercise: (id: string) => void;
  exerciseConfigs: {[key: string]: ExerciseConfig};
  onCreateWorkout: () => void;
  isCreating?: boolean;
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
  visible,
  onClose,
  workoutName,
  onChangeWorkoutName,
  selectedExercises,
  exercisesList,
  onToggleExercise,
  exerciseConfigs,
  onCreateWorkout,
  isCreating = false
}) => {
  // Fonction pour obtenir le texte de configuration pour un exercice
  const getExerciseConfigText = (exerciseId: string): string => {
    const config = exerciseConfigs[exerciseId];
    if (!config) return '3 séries × 10 répétitions | 60s de repos';
    
    const mainConfig = config.isTimeBased 
      ? `${config.sets} séries × ${config.duration} sec` 
      : `${config.sets} séries × ${config.reps} répétitions`;
      
    return `${mainConfig} | ${config.restTime}s de repos`;
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={isCreating ? undefined : onClose}
      title="Créer un entraînement"
    >
      <View className="p-4">
        <Text className="text-white font-body-medium mb-2">Nom de l'entraînement</Text>
        <TextInput
          className="bg-gray-800 text-white py-3 px-4 rounded-lg mb-4"
          placeholder="Ex: Full Body, Haut du corps, etc."
          placeholderTextColor="#999"
          value={workoutName}
          onChangeText={onChangeWorkoutName}
          editable={!isCreating}
        />
        
        <Text className="text-white font-body-medium mb-3">Exercices sélectionnés ({selectedExercises.length})</Text>
        
        <View className="mb-6 max-h-[300px]">
          <FlatList
            data={exercisesList?.filter(ex => selectedExercises.includes(ex.id)) || []}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center py-3 border-b border-gray-800">
                <View className="flex-1">
                  <Text className="text-white font-body-medium">{item.name}</Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    {getExerciseConfigText(item.id)}
                  </Text>
                </View>
                {!isCreating && (
                  <TouchableOpacity onPress={() => onToggleExercise(item.id)}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
        
        <TouchableOpacity
          className={`bg-accent py-3 rounded-lg items-center ${isCreating ? 'opacity-70' : ''}`}
          onPress={onCreateWorkout}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white font-body-semibold">Créer l'entraînement</Text>
          )}
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default CreateWorkoutModal;