
import { useLoadFonts } from '../src/hooks/useLoadFonts';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../src/navigation/AppNavigator';
import { AuthProvider } from '../src/context/AuthContext';



import '../global.css';

export default function App() {
  
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) {
    return null;
  }

    return (
      <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
    );
  
}