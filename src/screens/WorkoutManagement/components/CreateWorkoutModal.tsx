import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BottomSheet } from '../../../components/ui/BottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../../hooks/useExerciseGithubDB'; // Nouveau type d'exercice

interface CreateWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
  workoutName: string;
  onChangeWorkoutName: (name: string) => void;
  selectedExercises: string[];
  exercisesList: Exercise[] | null;
  onToggleExercise: (id: string) => void;
  onCreateWorkout: () => void;
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
  visible,
  onClose,
  workoutName,
  onChangeWorkoutName,
  selectedExercises,
  exercisesList,
  onToggleExercise,
  onCreateWorkout
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
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
        />
        
        <Text className="text-white font-body-medium mb-3">Exercices sélectionnés ({selectedExercises.length})</Text>
        
        <View className="mb-6 max-h-[200px]">
          <FlatList
            data={exercisesList?.filter(ex => selectedExercises.includes(ex.id)) || []}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center py-2 border-b border-gray-800">
                <Text className="text-white flex-1">{item.name}</Text>
                <TouchableOpacity onPress={() => onToggleExercise(item.id)}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        
        <TouchableOpacity
          className="bg-accent py-3 rounded-lg items-center"
          onPress={onCreateWorkout}
        >
          <Text className="text-white font-body-semibold">Créer l'entraînement</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default CreateWorkoutModal;