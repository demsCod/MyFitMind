import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXERCISES_KEY = 'exerciseDB_data';
const LAST_FETCH_TIME_KEY = 'exerciseDB_lastFetch';

// Réduire la durée de validité du cache pour les GIFs (en millisecondes)
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures au lieu de 7 jours

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
const HEADERS = {
  'X-RapidAPI-Key': '33700579c8mshf93ad7edb30a96cp14f394jsn2c63896f2464',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

export const useExerciseDB = () => {
  const [exercises, setExercises] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [gifError, setGifError] = useState(false);

  const loadFromStorage = async () => {
    try {
      // Récupérer les données et la date du dernier chargement
      const cachedData = await AsyncStorage.getItem(EXERCISES_KEY);
      const lastFetchTimeStr = await AsyncStorage.getItem(LAST_FETCH_TIME_KEY);
      
      if (!cachedData) {
        console.log('Aucune donnée en cache, chargement depuis l\'API');
        return false; // Pas de données en cache
      }
      
      // Vérifier si les données sont récentes
      if (lastFetchTimeStr) {
        const lastFetchTime = parseInt(lastFetchTimeStr);
        const now = Date.now();
        
        // Si les données sont encore fraîches, les utiliser
        if (now - lastFetchTime < CACHE_DURATION) {
          const parsedData = JSON.parse(cachedData);
          setExercises(parsedData);
          console.log('Exercices chargés depuis le stockage local (données fraîches)');
          
          // Vérifier si le premier GIF est encore valide
          if (parsedData && parsedData.length > 0) {
            checkGifValidity(parsedData[0]?.gifUrl);
          }
          
          setLoading(false);
          return true; // Données fraîches en cache
        }
        
        console.log('Données en cache expirées, rechargement depuis l\'API');
      }
      
      // Utiliser les données en cache pendant le chargement
      setExercises(JSON.parse(cachedData));
      console.log('Exercices chargés depuis le stockage local (en attendant rafraîchissement)');
      
      return false; // Données en cache mais expirées
    } catch (error) {
      console.error('Erreur lors du chargement depuis le stockage :', error);
      return false;
    }
  };

  // Fonction pour vérifier si un lien GIF est toujours valide
  const checkGifValidity = async (gifUrl: string) => {
    if (!gifUrl) return;
    
    try {
      const response = await fetch(gifUrl, { method: 'HEAD' });
      if (!response.ok) {
        console.log('GIF expiré détecté, rafraîchissement nécessaire');
        setGifError(true);
        // Si on détecte un GIF expiré, on force le rafraîchissement
        await fetchAndStore();
      } else {
        setGifError(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du GIF:', error);
      setGifError(true);
      await fetchAndStore();
    }
  };

  const fetchAndStore = async () => {
    try {
      console.log('Début du chargement depuis l\'API...');
      setLoading(true);
      
      const response = await fetch(API_URL, { headers: HEADERS });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Stocker les données et la date de chargement
      await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(LAST_FETCH_TIME_KEY, Date.now().toString());
      
      console.log('Exercices récupérés depuis l\'API et stockés localement');
      setGifError(false);
      setExercises(data);
    } catch (error) {
      console.error('Erreur lors du fetch des exercices :', error);
      // En cas d'erreur, on garde les données en cache si elles existent
    } finally {
      setLoading(false);
    }
  };

  const refreshExercises = async () => {
    await fetchAndStore();
  };

  useEffect(() => {
    const initData = async () => {
      const hasFreshData = await loadFromStorage();
      
      // Ne faire une requête API que si on n'a pas de données fraîches
      if (!hasFreshData) {
        await fetchAndStore();
      }
    };
    
    initData();
  }, []);

  // Si on détecte une erreur de GIF, on rafraîchit automatiquement
  useEffect(() => {
    if (gifError) {
      refreshExercises();
    }
  }, [gifError]);

  return { 
    exercises, 
    loading, 
    refreshExercises,
    gifError
  };
};