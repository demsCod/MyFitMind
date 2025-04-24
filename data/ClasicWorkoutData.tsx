import { ImageSourcePropType } from "react-native";

export interface ClassicWorkoutData {
  id: number;
  title: string;
  image: ImageSourcePropType;
}

export const classicWorkoutData: ClassicWorkoutData[] = [
  {
    id: 1,
    title: "Full Body Workout",
    image: require("../assets/images/fullbody.png"),
  },
  {
    id: 2,
    title: "Chest Workout",
    image: require("../assets/images/chestworkout.png"),
  },
  {
    id: 3,
    title: "Back Workout",
    image: require("../assets/images/backworkout.png"),
  },    
];