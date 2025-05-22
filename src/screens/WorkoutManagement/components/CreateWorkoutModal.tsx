import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Modal, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={isCreating ? undefined : onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.6)" barStyle="light-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center bg-black/70">
          <View className="mx-4 bg-background rounded-xl overflow-hidden">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 ">
              {!isCreating && (
                <TouchableOpacity onPress={onClose} className="p-1 ml-auto">
                  <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="p-4">
              {/* Nom de l'entraînement */}
              <Text className="text-white font-body-medium mb-2">Nom de l'entraînement</Text>
              <TextInput
                className="bg-grey/20 text-white py-3 px-4 rounded-lg mb-4"
                placeholder="Ex: Full Body, Haut du corps, etc."
                placeholderTextColor="#999"
                value={workoutName}
                onChangeText={onChangeWorkoutName}
                editable={!isCreating}
              />
              
              {/* Exercices sélectionnés */}
              <Text className="text-white font-body-medium mb-3">
                Exercices sélectionnés ({selectedExercises.length})
              </Text>
              
              {selectedExercises.length > 0 ? (
                <View className="mb-6 max-h-[300px]">
                  <FlatList
                    data={exercisesList?.filter(ex => selectedExercises.includes(ex.id)) || []}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => (
                      <View className="flex-row items-center py-3">
                        <View className="flex-1">
                          <Text className="text-white font-body-medium">{item.name}</Text>
                          <Text className="text-gray-400 text-xs mt-1">
                            {getExerciseConfigText(item.id)}
                          </Text>
                        </View>
                        {!isCreating && (
                          <TouchableOpacity 
                            onPress={() => onToggleExercise(item.id)}
                            className="p-2"
                          >
                            <Ionicons name="close-circle" size={20} color="#999" />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  />
                </View>
              ) : (
                <View className="items-center justify-center py-8 bg-gray-800/30 mb-6 rounded-lg">
                  <Ionicons name="barbell-outline" size={32} color="#666" />
                  <Text className="text-gray-400 mt-2 text-center">
                    Aucun exercice sélectionné
                  </Text>
                </View>
              )}
              
              {/* Boutons d'action */}
              <View className="flex-row space-x-3">
            
                
                <TouchableOpacity
                  className={`flex-1 bg-accent py-3 rounded-lg items-center ${isCreating || selectedExercises.length === 0 ? 'opacity-70' : ''}`}
                  onPress={onCreateWorkout}
                  disabled={isCreating || selectedExercises.length === 0}
                >
                  {isCreating ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text className="text-white font-body-semibold">Validate</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateWorkoutModal;