import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Workout, WorkoutExercise } from '../../services/WorkoutService';
import { Image } from 'react-native';

const WorkoutSession = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workout } = route.params as { workout: Workout };

  const [completedSeries, setCompletedSeries] = useState<{ [key: number]: number[] }>({});
  const [currentTimer, setCurrentTimer] = useState<number | null>(null);
  const [isResting, setIsResting] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [totalRestTime, setTotalRestTime] = useState<number | null>(null); // Total time for the rest

  const handleCompleteSeries = (exerciseIndex: number, seriesIndex: number, restTime: number) => {
    setCompletedSeries((prev) => ({
      ...prev,
      [exerciseIndex]: [...(prev[exerciseIndex] || []), seriesIndex],
    }));

    if (restTime > 0) {
      setIsResting(true);
      setTotalRestTime(restTime); // Set the total rest time
      setCurrentTimer(restTime);
      const timer = setInterval(() => {
        setCurrentTimer((prev) => {
          if (prev === null || prev <= 0.1) {
            clearInterval(timer);
            setIsResting(false);
            setTotalRestTime(null); // Reset total rest time
            return null;
          }
          return prev - 0.1; // Decrease by 0.1 seconds for smoother updates
        });
      }, 100); // Update every 100 ms
    }
  };

  const renderSeriesSteps = (exercise: WorkoutExercise, exerciseIndex: number) => {
    const series = Array.from({ length: exercise.config.sets }, (_, i) => i + 1);

    return series.map((seriesIndex) => {
      const isCompleted =
        completedSeries[exerciseIndex]?.includes(seriesIndex) || false;

      return (
        <TouchableOpacity
          key={seriesIndex}
          className={`flex-row items-start mb-4 ${
            isCompleted ? 'opacity-50' : ''
          }`}
          disabled={isCompleted || isResting}
          onPress={() =>
            handleCompleteSeries(
              exerciseIndex,
              seriesIndex,
              exercise.config.restTime
            )
          }
        >
          {/* Numéro de la série */}
          <View className="items-center">
            <View
              className={`h-8 w-8 rounded-full items-center justify-center ${
                isCompleted ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <Text className="text-white font-body-semibold">{seriesIndex}</Text>
            </View>
            {/* Ligne verticale */}
            {seriesIndex < series.length && (
              <View className="h-6 w-0.5 bg-gray-600 mt-1" />
            )}
          </View>

          {/* Contenu de la série */}
          <View className="ml-4">
            <Text className="text-gray-400 text-sm">
              - {exercise.config.isTimeBased
                ? `${exercise.config.duration}s`
                : `${exercise.config.reps} répétitions`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderExerciseSteps = () => {
    return workout.exercises.map((exercise, index) => (
      <View key={index} className="mb-6">
        {/* Exercice principal */}
        <TouchableOpacity
          onPress={() => setSelectedExercise(index)}
          className="flex-row items-start"
        >
          {/* Numéro de l'étape */}
          <View className="items-center">
            <View className="h-8 w-8 rounded-full bg-gray-700 items-center justify-center">
              <Text className="text-white font-body-semibold">{index + 1}</Text>
            </View>
            {/* Ligne verticale */}
            {index < workout.exercises.length - 1 && (
              <View className="h-6 w-0.5 bg-gray-600 mt-1" />
            )}
          </View>

          {/* Contenu de l'étape */}
          <View className="ml-4">
            <Text className="text-white font-body-semibold text-lg">
              {exercise.exercise.name}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              - {exercise.config.isTimeBased
                ? `${exercise.config.sets} séries × ${exercise.config.duration}s`
                : `${exercise.config.sets} séries × ${exercise.config.reps} répétitions`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Séries de l'exercice sélectionné */}
        {selectedExercise === index && (
          <View className="mt-4 ml-8">
            {renderSeriesSteps(exercise, index)}
          </View>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-800"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-title text-xl">Session d'entraînement</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Titre principal */}
      <Text className="text-white font-title text-2xl mb-4 px-4">{workout.name}</Text>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20 }}>
        {renderExerciseSteps()}
      </ScrollView>
        {/* Temps de repos */}
        {isResting && totalRestTime !== null && (
        <View className="bg-gray-800 rounded-lg p-4 mt-4 mx-4 overflow-hidden">
            <View
            className="absolute top-0 left-0 h-full bg-green-500"
            style={{
                width: `${((totalRestTime - (currentTimer || 0)) / totalRestTime) * 100}%`,
                height: '210%',
            }}
            />
            <Text className="text-white font-body-semibold text-lg text-center relative">
            Temps de repos: {typeof currentTimer === 'number' ? currentTimer.toFixed(1) : '0.0'}s
            </Text>
        </View>
        )}
    </SafeAreaView>
  );
};

export default WorkoutSession;