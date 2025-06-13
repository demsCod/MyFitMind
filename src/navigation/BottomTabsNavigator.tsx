import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { Image } from 'react-native';

import DumbbellIcon from '../../assets/icons/dumbell.png';
// Importez vos écrans ici
// import DashboardScreen from '../screens/DashboardScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#4a5757',
          borderTopColor: '#b0c4b1',
          height: 90,
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = (
              <Image
                source={DumbbellIcon}
                style={{
                  width: 48,
                  height: 24,
                  tintColor: focused ? 'white' : 'grey',
                }}
              />
            );
          } else if (route.name === 'Dashboard') {
            icon = (
              <Text style={{ color: focused ? 'white' : 'grey', fontSize: 22 }}>📊</Text>
            );
          } else if (route.name === 'Profile') {
            icon = (
              <Text style={{ color: focused ? 'white' : 'grey', fontSize: 22 }}>👤</Text>
            );
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: 20 }}>
              {icon}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Dashboard" 
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
            <Text style={{ color: 'white' }}>Dashboard en cours de développement</Text>
          </View>
        )} 
      />
      <Tab.Screen 
        name="Profile" 
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
            <Text style={{ color: 'white' }}>Profil en cours de développement</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}