import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#212021',
          borderTopColor: 'transparent',
          height: 60,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          zIndex: 5,
          borderRadius: 20,
          marginHorizontal: 20, 
          marginBottom: 10,
          paddingBottom: 10,

        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } 
          // else if (route.name === 'Profile') {
          //   iconName = focused ? 'person' : 'person-outline';
          // }

          return (
            <View className="items-center justify-center mt-5 h-full">
              <Ionicons
                name={iconName as any}
                size={20}
                color={focused ? 'white' : 'grey'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
