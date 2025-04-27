import { Workout } from '../services/WorkoutService';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  WorkoutManagement: undefined;
  WorkoutDetail: { workoutId: string };
  WorkoutSession?: { workout: Workout }; // Pour une future fonctionnalité
};