import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkouts } from '../../../hooks/useWorkouts';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { RootStackParamList } from '../../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';


const notfoundImage =  require('../../../../assets/WorkoutNotFound.png'); 


function SelectWorkout() {

  const { workouts, loading, error, refreshWorkouts, isSyncing, deleteWorkout } = useWorkouts();
  type NavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
  const navigation = useNavigation<NavigationProp>();
  const [contextMenu, setContextMenu] = useState<{visible: boolean; workoutId: string | null}>({
    visible: false,
    workoutId: null
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
    if (!workoutId) return;
    console.log(`Voir l'entraînement: ${workoutId}`);
    navigation.navigate('WorkoutDetail', { workoutId });
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
      </ScrollView>
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
        ) : workouts.length === 0 ?  (
          <View className="items-center justify-center py-0">
          
            <Image source={notfoundImage} className="w-[250px] h-[200px]" />
            <Text className="text-white text-center mt-3">
            
            </Text>
          </View>
        ) : (
          <ScrollView 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ maxHeight: 280,
              flexGrow: 1, // Permet de s'adapter à l'espace disponible
              flexShrink: 1, // Permet de s'adapter à l'espace disponible
              minHeight: 280, 
              height: 280, // Fixe la hauteur pour éviter les problèmes de défilement 
             }} // Fixed height
          >
            {workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  className="flex-row items-center justify-between px-4 py-2 rounded-xl mb-3 bg-grey/20"
                  onPress={() => navigateToWorkoutDetail(workout.id)}
                  onLongPress={() => handleLongPress(workout.id)}
                  delayLongPress={500}
                >
                  <View className="flex-1">
                    <Text className="text-white font-body text-xl">
                      {workout.name}
                    </Text>
                    <Text className="text-gray-300 font-body text-sm mt-1">
                      {workout.exercises.length} {workout.exercises.length > 1 ? "EXERCISES" : "EXERCISE"}
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
      </View>
      
      {/* Bouton pour créer un nouvel entraînement */}
      <TouchableOpacity
        className="flex-row items-center justify-center px-4 py-5  mb-2  rounded-3xl"
        onPress={handleCreateWorkout}
      >
        <Ionicons name="add-circle-outline" size={200} color="#b0c4b1" className="mr-2" />
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
                  onPress={() => contextMenu.workoutId && navigateToWorkoutDetail(contextMenu.workoutId)}
                >
                  <Ionicons name="play-circle-outline" size={24} color="#3772FF" />
                  <Text className="text-white ml-4 font-body-medium">Voir les détails</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center px-6 py-4"
                  onPress={() => contextMenu.workoutId &&  handleDeleteWorkout(contextMenu.workoutId)}
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
  );}


export default SelectWorkout;