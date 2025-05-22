import React, { useState } from 'react'
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import Calendar from '~/components/Calender/calender'
import Header from '~/components/Header'
import moment from 'moment'
import SelectWorkout from '~/components/HomePage/Select/SelectWorkout'

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleSelectDate = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  return (
    <View className="flex-1 bg-secondary">
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }} // Pour laisser de l'espace après le dernier composant
          showsVerticalScrollIndicator={false}
        >
          <Header />
          {/*<View className="px-2">
            <Calendar date={selectedDate} onSelectDate={handleSelectDate} />
            </View>*/}
            <SelectWorkout />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
