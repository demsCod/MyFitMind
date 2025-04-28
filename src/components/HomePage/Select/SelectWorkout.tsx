import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkouts } from '../../../hooks/useWorkouts';
import { useNavigation } from '@react-navigation/native';

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

// Définir les catégories disponibles
const categories: Category[] = [
  { id: "all", name: "Tous", icon: "fitness-outline" },
  { id: "cardio", name: "Cardio", icon: "heart-outline" },
  { id: "muscle", name: "Musculation", icon: "barbell-outline" },
  { id: "strength", name: "Force", icon: "body-outline" },
  { id: "hiit", name: "HIIT", icon: "flash-outline" },
  { id: "yoga", name: "Yoga", icon: "leaf-outline" },
  { id: "other", name: "Autres", icon: "options-outline" },
];

const CategoryPills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { workouts, loading, error, refreshWorkouts, isSyncing, deleteWorkout } = useWorkouts();
  const navigation = useNavigation();
  const [contextMenu, setContextMenu] = useState<{visible: boolean; workoutId: string | null}>({
    visible: false,
    workoutId: null
  });

  // Calculer la durée totale et le nombre d'exercices pour chaque entraînement
  const workoutsWithMeta = workouts.map(workout => {
    // Calculer la durée approximative basée sur le nombre de séries et temps de repos
    let totalDuration = 0;
    const exercisesCount = workout.exercises.length;
    
    workout.exercises.forEach(ex => {
      const sets = parseInt(ex.config.sets) || 0;
      
      if (ex.config.isTimeBased) {
        const duration = parseInt(ex.config.duration) || 0;
        const restTime = parseInt(ex.config.restTime) || 0;
        // Temps d'exercice + temps de repos entre les séries
        totalDuration += sets * duration + (sets - 1) * restTime;
      } else {
        const reps = parseInt(ex.config.reps) || 0;
        const restTime = parseInt(ex.config.restTime) || 0;
        // Estimation: 3 secondes par répétition + temps de repos
        totalDuration += sets * (reps * 3) + (sets - 1) * restTime;
      }
    });
    
    // Convertir en minutes et arrondir
    const durationMinutes = Math.ceil(totalDuration / 60);
    
    return {
      ...workout,
      durationMinutes,
      exercisesCount
    };
  });

  // Ouvrir le menu contextuel
  const handleLongPress = (workoutId: string) => {
    setContextMenu({
      visible: true,
      workoutId
    });
  };

  // Fermer le menu contextuel
  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      workoutId: null
    });
  };

  // Naviguer vers les détails de l'entraînement
  const navigateToWorkoutDetail = (workoutId: string) => {
    closeContextMenu();
    console.log(`Voir l'entraînement: ${workoutId}`);
    navigation.navigate('WorkoutDetail', { workoutId });
  };

  // Naviguer vers l'édition de l'entraînement
  const navigateToEditWorkout = (workoutId: string) => {
    closeContextMenu();
    console.log(`Modifier l'entraînement: ${workoutId}`);
    // navigation.navigate('EditWorkout', { workoutId });
  };

  // Supprimer un entraînement avec confirmation
  const handleDeleteWorkout = (workoutId: string) => {
    closeContextMenu();
    
    Alert.alert(
      "Supprimer l'entraînement",
      "Êtes-vous sûr de vouloir supprimer cet entraînement ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteWorkout(workoutId);
              // Afficher une confirmation
              Alert.alert("Succès", "L'entraînement a été supprimé avec succès.");
            } catch (error) {
              console.error("Erreur lors de la suppression:", error);
              Alert.alert("Erreur", "Impossible de supprimer l'entraînement.");
            }
          }
        }
      ]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCreateWorkout = () => {
    navigation.navigate('WorkoutManagement');
  };

  // Tirer pour rafraîchir les entraînements
  useEffect(() => {
    refreshWorkouts();
  }, []);

  return (
    <View className="mt-4 mb-2">
      {/* Catégories d'entraînement */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 1 }}
        className="mb-2"
        style={{ height: 40 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategorySelect(category.id)}
            className={`flex-row items-center mr-1 justify-centers px-4 py-2 rounded-2xl border border-grey ${
              selectedCategory === category.id 
                ? "bg-accent" 
                : "bg-bottom"
            }`}
          >
            <Text 
              className={`${
                selectedCategory === category.id 
                  ? "text-black font-body-semibold" 
                  : "text-white font-body"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Liste des entraînements de l'utilisateur */}
      <View className="mt-4">
        {loading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#3772FF" />
            <Text className="text-white mt-3">Chargement de vos entraînements...</Text>
          </View>
        ) : error ? (
          <View className="items-center justify-center py-10">
            <Ionicons name="alert-circle-outline" size={40} color="#ff3b30" />
            <Text className="text-white text-center mt-3">{error}</Text>
            <TouchableOpacity 
              className="mt-4 bg-accent py-2 px-4 rounded-lg"
              onPress={refreshWorkouts}
            >
              <Text className="text-white font-body">Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : workoutsWithMeta.length === 0 ? (
          <View className="items-center justify-center py-10">
            <Ionicons name="fitness-outline" size={40} color="#666" />
            <Text className="text-white text-center mt-3">
              Vous n'avez pas encore créé d'entraînement
            </Text>
          </View>
        ) : (
          <ScrollView 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ minHeight: 250 }} // Fixed height
          >
            {workoutsWithMeta
              // Filtre basé sur la catégorie (à implémenter selon votre logique)
              .filter(workout => selectedCategory === "all" || workout.category === selectedCategory)
              .map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  className="flex-row items-center justify-between px-4 py-4 mb-3 rounded-xl border border-grey bg-grey/20"
                  onPress={() => navigateToWorkoutDetail(workout.id)}
                  onLongPress={() => handleLongPress(workout.id)}
                  delayLongPress={500}
                >
                  <View className="flex-1">
                    <Text className="text-white font-body-semibold text-xl">
                      {workout.name}
                    </Text>
                    <Text className="text-gray-300 font-body mt-1">
                      {workout.durationMinutes} min • {workout.exercises.length} exercices
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigateToWorkoutDetail(workout.id)}
                    className="rounded-full p-2"
                  >
                   
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        )}
        
        {/* Indicateur de synchronisation */}
        {isSyncing && (
          <View className="flex-row items-center justify-center mt-1 mb-2">
            <ActivityIndicator size="small" color="#666" />
            <Text className="text-gray-400 ml-2 text-xs">Synchronisation...</Text>
          </View>
        )}
        
        {/* Séparateur */}
        <View className="h-0.5 bg-grey w-96 self-center mt-2" />
      </View>
      
      {/* Bouton pour créer un nouvel entraînement */}
      <TouchableOpacity
        className="flex-row items-center justify-center px-4 py-5 mt-6 mb-2 rounded-3xl"
        onPress={handleCreateWorkout}
      >
        <Ionicons name="add-circle-outline" size={40} color="#ddd" className="mr-2" />
        <Text className="text-white font-title text-lg ml-2">
          Créer un nouvel entraînement
        </Text>
      </TouchableOpacity>

      {/* Menu contextuel (affichage quand longue pression) */}
      <Modal
        transparent={true}
        visible={contextMenu.visible}
        onRequestClose={closeContextMenu}
        animationType="fade"
      >
        <TouchableOpacity
          className="flex-1 bg-black/60"
          activeOpacity={1}
          onPress={closeContextMenu}
        >
          <View className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl overflow-hidden">
            {contextMenu.workoutId && (
              <>
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4 border-b border-gray-700"
                  onPress={() => navigateToWorkoutDetail(contextMenu.workoutId)}
                >
                  <Ionicons name="play-circle-outline" size={24} color="#3772FF" />
                  <Text className="text-white ml-4 font-body-medium">Voir les détails</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4 border-b border-gray-700"
                  onPress={() => navigateToEditWorkout(contextMenu.workoutId)}
                >
                  <Ionicons name="create-outline" size={24} color="#3772FF" />
                  <Text className="text-white ml-4 font-body-medium">Modifier</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4"
                  onPress={() => handleDeleteWorkout(contextMenu.workoutId)}
                >
                  <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                  <Text className="text-red-500 ml-4 font-body-medium">Supprimer</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center justify-center px-6 py-4 bg-gray-800 mt-1"
                  onPress={closeContextMenu}
                >
                  <Text className="text-white font-body-medium">Annuler</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CategoryPills;