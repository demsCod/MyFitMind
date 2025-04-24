import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useExerciseGithubDB } from '../../hooks/useExerciseGithubDB'; // Nouveau hook
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '../../components/ui/Chip';
import { useNavigation } from '@react-navigation/native';

// Composants locaux
import ExerciseCard from './components/ExerciseCard';
import FilterBar from './components/FilterBar';
import CreateWorkoutModal from './components/CreateWorkoutModal';
import FilterModal from './components/FilterModal';
import SortModal from './components/SortModal';
import useExerciseFilters from './hooks/useExerciseFilters';

export default function WorkoutManagement() {
  // Utiliser le nouveau hook pour les exercices GitHub
  const { exercises, loading, error, refreshExercises } = useExerciseGithubDB();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');

  // Utiliser le hook de filtres avec les exercices GitHub
  const { 
    filters, 
    filterOptions, 
    sortOption, 
    filteredExercises, 
    showFilterModal, 
    showSortModal,
    setShowFilterModal,
    setShowSortModal,
    setSortOption,
    handleFilterChange,
    resetFilters
  } = useExerciseFilters(exercises);

  // Fonction pour rafraîchir les exercices
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshExercises();
    setRefreshing(false);
  };

  // Fonction pour sélectionner/désélectionner un exercice
  const toggleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  // Fonction pour créer l'entraînement
  const handleCreateWorkout = () => {
    if (!workoutName.trim()) {
      alert("Veuillez donner un nom à votre entraînement");
      return;
    }
    
    if (selectedExercises.length === 0) {
      alert("Veuillez sélectionner au moins un exercice");
      return;
    }
    
    // Ici vous ajouteriez le code pour sauvegarder l'entraînement
    console.log("Entraînement créé:", {
      name: workoutName,
      exercises: exercises?.filter(ex => selectedExercises.includes(ex.id)) || []
    });
    
    // Réinitialiser
    setWorkoutName('');
    setSelectedExercises([]);
    setShowCreateModal(false);
  };

  // Contenus conditionnels
  const renderContent = () => {
    // Affichage pendant le chargement
    if (loading) {
      return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color="#3772FF" />
          <Text className="text-white mt-4">Chargement des exercices...</Text>
        </SafeAreaView>
      );
    }

    // Si erreur lors du chargement
    if (error) {
      return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center px-4">
          <Ionicons name="alert-circle-outline" size={60} color="#ff3b30" />
          <Text className="text-white font-title text-lg mt-4 mb-2 text-center">
            Erreur lors du chargement
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            {error}
          </Text>
          <TouchableOpacity 
            className="bg-accent py-3 px-6 rounded-lg"
            onPress={refreshExercises}
          >
            <Text className="text-white font-body-semibold">Réessayer</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    // Si aucun exercice n'est trouvé
    if (!exercises || exercises.length === 0) {
      return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center px-4">
          <Ionicons name="fitness-outline" size={60} color="#666" />
          <Text className="text-white font-title text-lg mt-4 mb-2 text-center">
            Aucun exercice trouvé
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Nous n'avons pas pu charger les exercices. Vérifiez votre connexion ou réessayez plus tard.
          </Text>
          <TouchableOpacity 
            className="bg-accent py-3 px-6 rounded-lg"
            onPress={refreshExercises}
          >
            <Text className="text-white font-body-semibold">Réessayer</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    // Afficher les exercices avec filtres
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="px-4 py-4 flex-row items-center justify-between">
          <Text className="text-white font-title text-2xl">Exercices</Text>
          <TouchableOpacity 
            className="p-2 rounded-full bg-gray-800" 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <FilterBar 
          filters={{ search: filters.search, target: filters.target, equipment: filters.equipment }}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />
        
        {/* Affichage des filtres actifs */}
        {(filters.bodyPart || filters.target || filters.equipment || filters.level) && (
          <View className="flex-row flex-wrap px-4 mb-3 gap-2">
            {filters.bodyPart && (
              <Chip 
                label={`Partie: ${filters.bodyPart}`} 
                onClose={() => handleFilterChange('bodyPart', '')}
              />
            )}
            {filters.target && (
              <Chip 
                label={`Muscle: ${filters.target}`} 
                onClose={() => handleFilterChange('target', '')}
              />
            )}
            {filters.equipment && (
              <Chip 
                label={`Équipement: ${filters.equipment}`} 
                onClose={() => handleFilterChange('equipment', '')}
              />
            )}
            {filters.level && (
              <Chip 
                label={`Niveau: ${
                  filters.level === 'beginner' ? 'Débutant' : 
                  filters.level === 'intermediate' ? 'Intermédiaire' : 
                  'Avancé'
                }`} 
                onClose={() => handleFilterChange('level', '')}
              />
            )}
          </View>
        )}
        
        {/* Liste des exercices filtrés */}
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard 
              exercise={item} 
              isSelected={selectedExercises.includes(item.id)}
              onToggleSelect={() => toggleExerciseSelection(item.id)}
            />
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3772FF"]}
              tintColor="#3772FF"
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Ionicons name="search-outline" size={40} color="#666" />
              <Text className="text-white text-center mt-3">
                Aucun exercice ne correspond aux critères de recherche
              </Text>
            </View>
          }
        />
        
        {/* Bouton pour créer l'entraînement */}
        {selectedExercises.length > 0 && (
          <View className="absolute bottom-4 right-4 left-4 bg-background">
            <TouchableOpacity 
              className="bg-accent py-3 rounded-lg items-center flex-row justify-center"
              onPress={() => setShowCreateModal(true)}
            >
              <Text className="text-white font-body-semibold ml-2">
                Créer l'entraînement ({selectedExercises.length})
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  };

  // Envelopper tout le contenu avec GestureHandlerRootView
  return (
    <GestureHandlerRootView className="flex-1">
      {renderContent()}
      <FilterModal 
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={{...filters, level: filters.level}}
        filterOptions={{...filterOptions, levels: filterOptions.levels}}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
      <SortModal 
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        sortOption={sortOption}
        onSelectSort={setSortOption}
      />
      <CreateWorkoutModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        workoutName={workoutName}
        onChangeWorkoutName={setWorkoutName}
        selectedExercises={selectedExercises}
        exercisesList={exercises}
        onToggleExercise={toggleExerciseSelection}
        onCreateWorkout={handleCreateWorkout}
      />
    </GestureHandlerRootView>
  );
}