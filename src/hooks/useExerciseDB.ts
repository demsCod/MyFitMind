import { useEffect, useState } from 'react';
import { exerciseData, Exercise } from '../../data/WorkoutData';

export const useExerciseDB = () => {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Chargement initial des données
  useEffect(() => {
    // Simulation d'un temps de chargement minime pour la transition UI
    setTimeout(() => {
      setExercises(exerciseData);
      setLoading(false);
    }, 100);

    console.log('Exercices chargés depuis les données locales');
  }, []);

  // Fonction de rafraîchissement maintenue pour la compatibilité avec le reste du code
  const refreshExercises = () => {
    setLoading(true);
    
    // Simulation d'un temps de chargement pour le refresh UI
    setTimeout(() => {
      setExercises([...exerciseData]); // Copie fraîche des données
      setLoading(false);
    }, 300);
    
    console.log('Données d\'exercices rafraîchies (données locales)');
  };

  return { 
    exercises, 
    loading, 
    refreshExercises,
    // On peut supprimer gifError car nous n'avons plus de problèmes de validité des GIFs
    // avec des ressources locales
  };
};