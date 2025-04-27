import { useState, useEffect, useCallback } from 'react';
import { WorkoutService, Workout } from '../services/WorkoutService';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Charger les entraînements
  const loadWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await WorkoutService.getAllWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error('Erreur lors du chargement des entraînements:', err);
      setError('Impossible de charger les entraînements');
    } finally {
      setLoading(false);
    }
  }, []);

  // Synchroniser avec Firebase
  const syncWithFirebase = useCallback(async () => {
    if (!FIREBASE_AUTH.currentUser) return;
    
    try {
      setIsSyncing(true);
      await WorkoutService.syncWithFirebase();
      await loadWorkouts(); // Recharger après synchro
    } catch (err) {
      console.error('Erreur lors de la synchronisation:', err);
      setError('Problème de synchronisation avec le cloud');
    } finally {
      setIsSyncing(false);
    }
  }, [loadWorkouts]);

  // Ajouter un entraînement
  const addWorkout = async (name: string, exercises: any[]) => {
    try {
      const newWorkout = await WorkoutService.addWorkout(name, exercises);
      setWorkouts(prev => [...prev, newWorkout]);
      return newWorkout;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'entraînement:', err);
      throw err;
    }
  };

  // Supprimer un entraînement
  const deleteWorkout = async (id: string) => {
    try {
      await WorkoutService.deleteWorkout(id);
      setWorkouts(prev => prev.filter(workout => workout.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'entraînement:', err);
      throw err;
    }
  };

  // Effet pour charger les entraînements au début
  useEffect(() => {
    loadWorkouts();
    
    // Écouter les changements d'authentification pour synchroniser
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // L'utilisateur vient de se connecter, synchronisons
        syncWithFirebase();
      }
    });
    
    return () => unsubscribe();
  }, [loadWorkouts, syncWithFirebase]);

  return {
    workouts,
    loading,
    error,
    isSyncing,
    refreshWorkouts: loadWorkouts,
    syncWithFirebase,
    addWorkout,
    deleteWorkout
  };
};