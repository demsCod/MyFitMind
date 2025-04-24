import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native';
import { classicWorkoutData } from '../../../../data/ClasicWorkoutData';

const ClassicWorkoutList = () => {

  return (
    <View>
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginLeft: 16, 
        marginBottom: 0,
        fontFamily: 'Poppins',
        color: 'white',
      }}>
        
      </Text>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={classicWorkoutData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ 
        width: 280, 
        height: 180, 
        marginRight: 16, 
        borderRadius: 25, 
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        }}>
        <View style={{ flex: 1 }}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Text style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Anton_400Regular', // 👉 Police Anton pour le titre de chaque item
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                  letterSpacing: 1,
                }}>
            {item.title.toUpperCase()}  
          </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={item.image} style={{ width: '100%', height: '100%', borderRadius: 12 }} resizeMode="cover" />
          </View>
        </View>
        </View>
      )}
      contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 16 }}
      snapToAlignment="center"
      snapToInterval={296} // width + marginRight
      decelerationRate="fast"
      />
    </View>
  )
}

export default ClassicWorkoutList