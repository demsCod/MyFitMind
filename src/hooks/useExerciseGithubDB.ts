import { useState, useEffect } from 'react';
import { exerciseData, Exercise as LocalExercise } from '../../data/WorkoutData';

// Type adapté depuis votre format WorkoutData
export interface Exercise {
  id: string;
  name: string;
  gifUrl?: string;
  bodyPart?: string;
  target: string;
  equipment: string;
  category: string;
  instructions: string[]; // Maintenant un champ requis, pas optionnel
  secondaryMuscles?: string[];
  image?: any;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export const useExerciseGithubDB = () => {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convertir les données de WorkoutData au format attendu par l'application
  const mapLocalExerciseToInternalFormat = (exercise: LocalExercise): Exercise => {
    return {
      id: exercise.id,
      name: exercise.name,
      gifUrl: exercise.image ? 'local-image' : undefined,
      image: exercise.image,
      bodyPart: exercise.category,
      target: exercise.targetMuscles[0] || '',
      equipment: exercise.equipment[0] || '',
      category: exercise.category,
      // Utiliser les instructions définies ou un tableau par défaut avec une instruction générique
      instructions: exercise.instructions || ["Réalisez l'exercice en suivant la démonstration visuelle."],
      secondaryMuscles: exercise.targetMuscles.slice(1),
      difficultyLevel: exercise.difficultyLevel
    };
  };

  // Charger les données depuis WorkoutData
  const loadLocalExercises = () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Chargement des exercices depuis les données locales...');
      
      // Convertir les exercices au format interne
      const mappedExercises = exerciseData.map(mapLocalExerciseToInternalFormat);
      
      console.log(`${mappedExercises.length} exercices chargés depuis les données locales`);
      setExercises(mappedExercises);
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices locaux:', error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
      setLoading(false);
    }
  };

  // Initialisation au montage du composant
  useEffect(() => {
    loadLocalExercises();
  }, []);

  // Fonction pour rafraîchir manuellement les données
  const refreshExercises = () => {
    loadLocalExercises();
  };

  return { exercises, loading, error, refreshExercises };
};