import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';


type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

// Définir les catégories d'entraînement
const categories: Category[] = [
  { id: "all", name: "Tous", icon: "fitness-outline" },
  { id: "cardio", name: "Cardio", icon: "heart-outline" },
  { id: "muscle", name: "Musculation", icon: "barbell-outline" },
  { id: "strength", name: "Force", icon: "body-outline" },
  { id: "hiit", name: "HIIT", icon: "flash-outline" },
  { id: "yoga", name: "Yoga", icon: "leaf-outline" },
  { id: "other", name: "Autres", icon: "options-outline" },
];

const CategoryPills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Ici vous pourriez ajouter la logique pour filtrer les workouts
    console.log(`Catégorie sélectionnée: ${categoryId}`);
  };

  return (
    <View className="mt-4 mb-2">

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 1 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategorySelect(category.id)}
            className={`flex-row items-center mr-1 justify-centers  px-4 py-2 rounded-2xl border border-grey ${
              selectedCategory === category.id 
                ? "bg-accent" 
                : "bg"
            }`}
          >
            <Text 
              className={` ${
                selectedCategory === category.id 
                  ? "text-white font-body" 
                  : "text-gray-300 font-body"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Si vous voulez aussi afficher des informations basées sur la sélection */}
      <View className="mt-4 px-4">
        <View className="bg-red-900 p-10 rounded-3xl mb-3">
            <View className="items-start">
                <Text className="font-display text-2xl ">
                    5x5 DEADLIFT RELOAD
                </Text>
                <Text className="font-body text-gray-400 mt-1">
                    45 minutes
                </Text>
            </View>
        </View>
        
       
      </View>
    </View>
  );
};

export default CategoryPills;