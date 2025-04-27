import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WorkoutService, Workout, WorkoutExercise } from '../../services/WorkoutService';

const WorkoutDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workoutId } = route.params as { workoutId: string };
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDuration, setTotalDuration] = useState(0);

  // Charger l'entraînement
  useEffect(() => {
    const loadWorkout = async () => {
      try {
        setLoading(true);
        const data = await WorkoutService.getWorkoutById(workoutId);
        if (data) {
          setWorkout(data);
          calculateTotalDuration(data.exercises);
        } else {
          setError("Entraînement non trouvé");
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'entraînement:", err);
        setError("Erreur lors du chargement de l'entraînement");
      } finally {
        setLoading(false);
      }
    };

    loadWorkout();
  }, [workoutId]);

  // Calculer la durée totale de l'entraînement
  const calculateTotalDuration = (exercises: WorkoutExercise[]) => {
    let duration = 0;
    
    exercises.forEach(ex => {
      const sets = parseInt(ex.config.sets) || 0;
      
      if (ex.config.isTimeBased) {
        const exerciseDuration = parseInt(ex.config.duration) || 0;
        const restTime = parseInt(ex.config.restTime) || 0;
        // Temps d'exercice + temps de repos entre les séries
        duration += sets * exerciseDuration + (sets - 1) * restTime;
      } else {
        const reps = parseInt(ex.config.reps) || 0;
        const restTime = parseInt(ex.config.restTime) || 0;
        // Estimation: 3 secondes par répétition + temps de repos
        duration += sets * (reps * 3) + (sets - 1) * restTime;
      }
    });
    
    setTotalDuration(Math.ceil(duration / 60)); // Conversion en minutes
  };

  // Commencer l'entraînement
  const startWorkout = () => {
    if (!workout) return;
    
    // Navigation vers l'écran d'exécution de l'entraînement
    Alert.alert(
      "Commencer l'entraînement",
      `Êtes-vous prêt à démarrer "${workout.name}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Commencer", 
          style: "default",
          onPress: () => {
            // Vous implémenterez cet écran plus tard
            // navigation.navigate('WorkoutSession', { workout });
            Alert.alert("En cours de développement", "Cette fonctionnalité sera disponible prochainement.");
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#3772FF" />
        <Text className="text-white mt-4">Chargement de l'entraînement...</Text>
      </SafeAreaView>
    );
  }

  if (error || !workout) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center px-4">
        <Ionicons name="alert-circle-outline" size={60} color="#ff3b30" />
        <Text className="text-white font-title text-lg mt-4 mb-2 text-center">
          {error || "Entraînement non trouvé"}
        </Text>
        <TouchableOpacity 
          className="bg-accent py-3 px-6 rounded-lg mt-4"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-body-semibold">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity 
          className="p-2 rounded-full bg-gray-800" 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-title text-xl">Détails de l'entraînement</Text>
        <View style={{ width: 32 }} />
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Informations principales */}
        <View className="px-4 py-6">
          <Text className="text-white font-title text-3xl">{workout.name}</Text>
          <View className="flex-row items-center mt-3">
            <Ionicons name="time-outline" size={18} color="#999" />
            <Text className="text-gray-400 ml-1">{totalDuration} minutes</Text>
            <View className="h-4 w-0.5 bg-gray-700 mx-3" />
            <Ionicons name="barbell-outline" size={18} color="#999" />
            <Text className="text-gray-400 ml-1">{workout.exercises.length} exercices</Text>
          </View>

          <Text className="text-gray-400 mt-4">
            Créé le {new Date(workout.createdAt).toLocaleDateString()}
          </Text>
        </View>
        
        {/* Liste des exercices */}
        <View className="pb-24">
          <Text className="text-white font-body-semibold text-xl px-4 mb-3">Exercices</Text>
          
          {workout.exercises.map((exercise, index) => (
            <View 
              key={`${exercise.exercise.id}_${index}`}
              className="flex-row py-4 px-4 border-b border-gray-800"
            >
              <View className="h-[70px] w-[80px] rounded-lg overflow-hidden bg-gray-900 mr-4">
                {exercise.exercise.gifUrl ? (
                  <Image
                    source={{ uri: exercise.exercise.gifUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Ionicons name="barbell-outline" size={24} color="#666" />
                  </View>
                )}
              </View>
              
              <View className="flex-1">
                <Text className="text-white font-body-medium text-base">
                  {exercise.exercise.name}
                </Text>
                
                <Text className="text-gray-400 text-sm mt-1">
                  {exercise.config.isTimeBased 
                    ? `${exercise.config.sets} séries × ${exercise.config.duration}s` 
                    : `${exercise.config.sets} séries × ${exercise.config.reps} répétitions`
                  }
                </Text>
                
                <Text className="text-gray-500 text-xs mt-1">
                  {exercise.config.restTime}s de repos entre les séries
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Bouton flottant pour commencer l'entraînement */}
      <View className="absolute bottom-8 left-4 right-4">
        <TouchableOpacity 
          className="bg-accent py-4 rounded-xl flex-row justify-center items-center"
          onPress={startWorkout}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text className="text-white font-body-semibold text-lg ml-2">
            Commencer l'entraînement
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutDetail;