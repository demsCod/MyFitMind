import { ImageSourcePropType } from "react-native";

export type EquipmentType = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'kettlebell' | 'resistance band' | 'medicine ball' | 'bench' | 'stability ball' | 'other';

export interface Exercise {
  id: string;
  name: string;
  category: 'legs' | 'back' | 'chest' | 'arms' | 'shoulders' | 'core' | 'cardio';
  image: ImageSourcePropType;
  equipment: EquipmentType[]; // Nouvelle propriété pour les matériels
  targetMuscles: string[];
  instructions?: string[]; // Ajout des instructions étape par étape
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced'; // Niveau de difficulté optionnel
}

export const exerciseData: Exercise[] = [
  {
    id: 'back-squat',
    name: 'Back Squat',
    category: 'legs',
    image: require("../assets/images/SPORT-ASSET/Back-Squat.gif"),
    equipment: ['barbell'],
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings', 'lower back'],
    instructions: [
      "Placez la barre sur vos épaules, derrière votre cou.",
      "Écartez les pieds à la largeur des épaules, orteils légèrement vers l'extérieur.",
      "Respirez profondément, contractez les abdominaux et maintenez le dos droit.",
      "Pliez les genoux et descendez comme si vous vouliez vous asseoir sur une chaise.",
      "Descendez jusqu'à ce que vos cuisses soient parallèles au sol.",
      "Poussez à travers vos talons pour remonter à la position de départ.",
      "Expirez à la montée."
    ],
    difficultyLevel: 'intermediate'
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl',
    category: 'legs',
    image: require("../assets/images/SPORT-ASSET/Leg-Curl.gif"),
    equipment: ['machine'],
    targetMuscles: ['hamstrings'],
    instructions: [
      "Allongez-vous sur la machine à leg curl, face vers le bas.",
      "Placez vos chevilles sous les coussins, jambes tendues.",
      "Agrippez les poignées pour stabiliser votre corps.",
      "Inspirez, puis pliez les genoux pour lever les talons vers les fesses.",
      "Maintenez la contraction pendant une seconde au point maximum.",
      "Redescendez lentement à la position de départ.",
      "Répétez le mouvement pour le nombre de répétitions désiré."
    ],
    difficultyLevel: 'beginner'
  },
  {
    id: 'stiff-legged-deadlift',
    name: 'Stiff-Legged Deadlift',
    category: 'legs',
    equipment: ['barbell'],
    image: require("../assets/images/SPORT-ASSET/Stiff-Legged Deadlift.gif"),
    targetMuscles: ['hamstrings', 'glutes', 'lower back'],
    instructions: [
      "Tenez-vous debout avec les pieds écartés à la largeur des hanches.",
      "Saisissez la barre avec une prise pronée (paumes vers le bas), mains légèrement plus écartées que la largeur des épaules.",
      "Gardez les genoux légèrement fléchis mais pas complètement droits.",
      "Baissez la barre vers le sol en poussant les hanches vers l'arrière.",
      "Gardez le dos droit et les épaules en arrière pendant tout le mouvement.",
      "Descendez jusqu'à ce que vous ressentiez un étirement dans les ischio-jambiers.",
      "Remontez en contractant les fessiers et en poussant les hanches vers l'avant.",
      "Revenez à la position de départ en gardant la barre proche du corps."
    ],
    difficultyLevel: 'intermediate'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'back',
    equipment: ['machine'],
    image: require("../assets/images/SPORT-ASSET/Lat-Pulldown.gif"),
    targetMuscles: ['lats', 'rhomboids', 'biceps'],
    instructions: [
      "Asseyez-vous face à la machine, réglez le coussin pour qu'il maintienne vos cuisses sous la plateforme.",
      "Saisissez la barre avec une prise large, paumes vers l'avant.",
      "Gardez le dos droit, les épaules basses et la poitrine bombée.",
      "Tirez la barre vers le bas jusqu'à ce qu'elle touche le haut de votre poitrine.",
      "Concentrez-vous sur l'utilisation des muscles du dos, pas des bras.",
      "Maintenez la contraction pendant une seconde.",
      "Relâchez lentement la barre jusqu'à la position de départ, bras tendus."
    ],
    difficultyLevel: 'beginner'
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'back',
    equipment: ['bodyweight'],
    image: require("../assets/images/SPORT-ASSET/Pull-Up.gif"),
    targetMuscles: ['lats', 'rhomboids', 'biceps', 'shoulders'],
    instructions: [
      "Saisissez la barre avec une prise pronée (paumes vers l'avant), mains écartées un peu plus que la largeur des épaules.",
      "Commencez avec les bras tendus, en suspension complète.",
      "Contractez les muscles du dos et tirez votre corps vers le haut.",
      "Continuez jusqu'à ce que votre menton dépasse la barre.",
      "Maintenez la position haute pendant une seconde.",
      "Redescendez lentement et sous contrôle jusqu'à la position de départ.",
      "Ne balancez pas le corps et évitez d'utiliser l'élan."
    ],
    difficultyLevel: 'advanced'
  }
];

// Fonction utilitaire pour récupérer une image par ID
export const getExerciseById = (id: string): ImageSourcePropType | null => {
  const exercise = exerciseData.find(ex => ex.id === id);
  return exercise ? exercise.image : null;
};

// Fonction utilitaire pour récupérer les exercices par catégorie
export const getExercisesByCategory = (category: string): Exercise[] => {
  return exerciseData.filter(ex => ex.category === category);
};