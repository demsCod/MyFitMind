import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../firebaseConfig';
import { Exercise } from '../hooks/useExerciseGithubDB';
import { ExerciseConfig } from '../screens/WorkoutManagement/components/ExerciseCard';

// Types pour le service d'entraînement
export interface WorkoutExercise {
  exercise: Exercise;
  config: ExerciseConfig;
}

export interface Workout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  createdAt: string;
  updatedAt: string;
  userId?: string; // ID de l'utilisateur pour Firebase
}

// Clés pour le stockage local
const WORKOUTS_STORAGE_KEY = '@MyFitMind:workouts';
const LAST_SYNC_KEY = '@MyFitMind:lastSync';

export const WorkoutService = {
  // Récupérer tous les entraînements (priorité au stockage local)
  getAllWorkouts: async (): Promise<Workout[]> => {
    try {
      // D'abord essayer de récupérer depuis le stockage local
      const workoutsJson = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
      const localWorkouts: Workout[] = workoutsJson ? JSON.parse(workoutsJson) : [];
      
      return localWorkouts;
    } catch (error) {
      console.error('Erreur lors de la récupération des entraînements:', error);
      return [];
    }
  },

  // Récupérer un entraînement par ID
  getWorkoutById: async (id: string): Promise<Workout | null> => {
    try {
      const workouts = await WorkoutService.getAllWorkouts();
      return workouts.find(workout => workout.id === id) || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'entraînement ${id}:`, error);
      return null;
    }
  },

  // Ajouter un nouvel entraînement
  addWorkout: async (name: string, workoutExercises: WorkoutExercise[]): Promise<Workout> => {
    try {
      // Créer le nouvel entraînement
      const newWorkout: Workout = {
        id: Date.now().toString(), // ID local temporaire
        name,
        exercises: workoutExercises,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Récupérer les entraînements existants
      const workouts = await WorkoutService.getAllWorkouts();
      const updatedWorkouts = [...workouts, newWorkout];
      
      // Sauvegarder localement
      await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updatedWorkouts));
      
      // Si l'utilisateur est connecté, sauvegarder sur Firebase
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        try {
          // Préparer les données pour Firebase (sans les références circulaires)
          const workoutForFirebase = {
            name: newWorkout.name,
            exercises: newWorkout.exercises.map(ex => ({
              exerciseId: ex.exercise.id,
              exerciseName: ex.exercise.name,
              config: ex.config
            })),
            createdAt: newWorkout.createdAt,
            updatedAt: newWorkout.updatedAt,
            userId: user.uid
          };
          
          // Ajouter à Firestore
          const docRef = await addDoc(collection(FIREBASE_DB, 'workouts'), workoutForFirebase);
          
          // Mettre à jour l'ID local avec l'ID Firebase
          newWorkout.id = docRef.id;
          newWorkout.userId = user.uid;
          
          // Mettre à jour le stockage local avec le nouvel ID
          const indexToUpdate = updatedWorkouts.findIndex(w => w.id === newWorkout.id);
          if (indexToUpdate !== -1) {
            updatedWorkouts[indexToUpdate] = newWorkout;
            await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updatedWorkouts));
          }
        } catch (firebaseError) {
          console.error('Erreur lors de la sauvegarde Firebase:', firebaseError);
          // Continuer car la version locale est déjà sauvegardée
        }
      }
      
      return newWorkout;
    } catch (error) {
      console.error(`Erreur lors de la création de l'entraînement:`, error);
      throw error;
    }
  },

  // Synchroniser avec Firebase (à appeler manuellement ou lors de la connexion)
  syncWithFirebase: async (): Promise<void> => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return; // Ne rien faire si l'utilisateur n'est pas connecté
    
    try {
      // Récupérer les entraînements locaux
      const localWorkouts = await WorkoutService.getAllWorkouts();
      
      // Récupérer les entraînements de l'utilisateur depuis Firebase
      const q = query(collection(FIREBASE_DB, 'workouts'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const firebaseWorkouts: Workout[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        firebaseWorkouts.push({
          id: doc.id,
          name: data.name,
          exercises: data.exercises,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          userId: data.userId
        });
      });
      
      // Fusionner les entraînements (stratégie simple : préférer Firebase)
      const mergedWorkouts = [...localWorkouts];
      
      // Ajouter ou mettre à jour les entraînements de Firebase
      for (const fbWorkout of firebaseWorkouts) {
        const localIndex = mergedWorkouts.findIndex(w => w.id === fbWorkout.id);
        if (localIndex >= 0) {
          // Si l'entraînement existe localement, garder la version la plus récente
          const localDate = new Date(mergedWorkouts[localIndex].updatedAt);
          const fbDate = new Date(fbWorkout.updatedAt);
          
          if (fbDate > localDate) {
            mergedWorkouts[localIndex] = fbWorkout;
          }
        } else {
          // Si l'entraînement n'existe pas localement, l'ajouter
          mergedWorkouts.push(fbWorkout);
        }
      }
      
      // Sauvegarder la liste fusionnée localement
      await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(mergedWorkouts));
      
      // Mettre à jour la date de dernière synchronisation
      await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      
    } catch (error) {
      console.error('Erreur lors de la synchronisation avec Firebase:', error);
      throw error;
    }
  },

  // Supprimer un entraînement
  deleteWorkout: async (id: string): Promise<void> => {
    try {
      // Supprimer localement
      const workouts = await WorkoutService.getAllWorkouts();
      const filteredWorkouts = workouts.filter(workout => workout.id !== id);
      await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(filteredWorkouts));
      
      // Supprimer sur Firebase si l'utilisateur est connecté
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        try {
          await deleteDoc(doc(FIREBASE_DB, 'workouts', id));
        } catch (firebaseError) {
          console.error(`Erreur lors de la suppression Firebase de l'entraînement ${id}:`, firebaseError);
          // Continuer car la suppression locale est déjà faite
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'entraînement ${id}:`, error);
      throw error;
    }
  }
};