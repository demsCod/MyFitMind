// AppNavigator.tsx
import { useAuth } from '~/context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '~/screens/SignUpScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import WorkoutManagement from '../screens/WorkoutManagement/index';
import WorkoutDetail from '../screens/WorkoutDetail/WorkoutDetail';
import WorkoutSession from '../screens/WorkoutDetail/WorkoutSession';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
     screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor: '#000000', // bg-background
        },
        headerTitle: '',
        headerTintColor: '#FFFFFF', // Texte blanc
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        },
        headerShadowVisible: false, // Supprime la ligne de séparation
    }}>
      {user ? (
        <>
        <Stack.Screen name="Main" component={BottomTabsNavigator} />
        <Stack.Screen name="WorkoutManagement" component={WorkoutManagement} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
        <Stack.Screen name="WorkoutSession" component={WorkoutSession} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          
        </>
      )}
    </Stack.Navigator>
  );
}
