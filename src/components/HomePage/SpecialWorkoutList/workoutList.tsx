import { View, Text } from 'react-native'
import AddButton from '~/components/ui/AddButton'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const WorkoutList = () => {
  const navigation = useNavigation()
  const handleAddWorkout = () => {
    navigation.navigate('WorkoutManagement');
  }

  return (
    <View className="w-full">
      <View className="items-center ">
        <AddButton onAddPress={handleAddWorkout} />
      </View>
      <Text className="text-grey text-lg font-body text-center mt-4 ">
      Crée ton entraînement
      </Text>
    </View>
  )
}

export default WorkoutList