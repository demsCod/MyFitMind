import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
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
          backgroundColor: '#212021',
          borderTopColor: 'transparent',
          height: 80,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          
          if (route.name === 'Home') {
            // Icône de musculation pour l'accueil
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Dashboard') {
            // Icône de statistiques pour le dashboard
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Profile') {
            // Icône de profil
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View className="items-center justify-center h-full mt-5">
              <Ionicons
                name={iconName as any}
                size={22}
                color={focused ? 'white' : 'grey'}
              />
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
