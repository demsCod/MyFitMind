import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URLs pour les données
const GITHUB_DATA_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const GITHUB_IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

// Clés pour le stockage local
const EXERCISES_GITHUB_KEY = 'exerciseGithubDB_data';
const LAST_FETCH_GITHUB_KEY = 'exerciseGithubDB_lastFetch';

// 7 jours de cache - Les données ne changent pas souvent
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

// Type d'un exercice du format GitHub
export interface GitHubExercise {
  id: string;
  name: string;
  force: string | null;
  level: string;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

// Type d'exercice mappé à notre format interne
export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  images: string[];
  bodyPart: string;
  target: string;
  equipment: string;
  instructions: string[];
  secondaryMuscles: string[];
  level: string;
}

export const useExerciseGithubDB = () => {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement depuis le stockage local
  const loadFromStorage = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(EXERCISES_GITHUB_KEY);
      const lastFetchTimeStr = await AsyncStorage.getItem(LAST_FETCH_GITHUB_KEY);
      
      if (!cachedData) {
        console.log('Aucune donnée en cache, chargement depuis GitHub...');
        return false;
      }
      
      if (lastFetchTimeStr) {
        const lastFetchTime = parseInt(lastFetchTimeStr);
        const now = Date.now();
        
        if (now - lastFetchTime < CACHE_DURATION) {
          const parsedData = JSON.parse(cachedData);
          setExercises(parsedData);
          console.log('Exercices chargés depuis le stockage local (données fraîches)');
          setLoading(false);
          return true;
        }
        
        console.log('Données en cache expirées, rechargement depuis GitHub...');
      }
      
      // Utiliser les données en cache pendant le chargement
      setExercises(JSON.parse(cachedData));
      return false;
    } catch (error) {
      console.error('Erreur lors du chargement depuis le stockage :', error);
      return false;
    }
  };

  // Conversion du format GitHub à notre format interne
  const mapGitHubExerciseToInternalFormat = (exercise: GitHubExercise): Exercise => {
    // Construction de l'URL de l'image principale
    const imageUrl = exercise.images && exercise.images.length > 0
      ? `${GITHUB_IMAGE_BASE_URL}${exercise.images[0]}`
      : '';
    
    // Construction des URLs pour toutes les images
    const imageUrls = exercise.images 
      ? exercise.images.map(img => `${GITHUB_IMAGE_BASE_URL}${img}`)
      : [];
      
    return {
      id: exercise.id,
      name: exercise.name,
      gifUrl: imageUrl,
      images: imageUrls,
      bodyPart: exercise.primaryMuscles[0] || '',
      target: exercise.primaryMuscles[0] || '',
      equipment: exercise.equipment || '',
      instructions: exercise.instructions || [],
      secondaryMuscles: exercise.secondaryMuscles || [],
      level: exercise.level || 'beginner'
    };
  };

  // Récupération depuis GitHub et stockage
  const fetchAndStoreExercises = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Chargement des exercices depuis GitHub...');
      const response = await fetch(GITHUB_DATA_URL);
      
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }
      
      const data: GitHubExercise[] = await response.json();
      
      // Mapper les données au format interne
      const mappedExercises = data.map(mapGitHubExerciseToInternalFormat);
      
      // Stocker les données mappées
      await AsyncStorage.setItem(EXERCISES_GITHUB_KEY, JSON.stringify(mappedExercises));
      await AsyncStorage.setItem(LAST_FETCH_GITHUB_KEY, Date.now().toString());
      
      console.log(`${mappedExercises.length} exercices récupérés depuis GitHub et stockés localement`);
      setExercises(mappedExercises);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices depuis GitHub:', error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Initialisation au montage du composant
  useEffect(() => {
    const initData = async () => {
      const hasFreshData = await loadFromStorage();
      
      if (!hasFreshData) {
        await fetchAndStoreExercises();
      }
    };
    
    initData();
  }, []);

  // Fonction pour rafraîchir manuellement les données
  const refreshExercises = async () => {
    await fetchAndStoreExercises();
  };

  return { exercises, loading, error, refreshExercises };
};