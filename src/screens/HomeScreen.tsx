import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import Header from '~/components/Header'
import SelectWorkout from '~/components/HomePage/Select/SelectWorkout'


export default function HomeScreen() {

  return (
    <View className="flex-1 bg-secondary">
      <SafeAreaView className="flex-1 bg-background">
        <Header />
        <SelectWorkout />
      </SafeAreaView>
    </View>
  );
}
