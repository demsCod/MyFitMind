// src/utils/useLoadFonts.ts
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts as usePoppinsFonts
} from '@expo-google-fonts/poppins';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts as useRobotoFonts
} from '@expo-google-fonts/roboto';

import {
  Anton_400Regular,
  useFonts as useAntonFonts
} from '@expo-google-fonts/anton';

export const useLoadFonts = () => {
  const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [robotoFontsLoaded] = useRobotoFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  const [antonFontsLoaded] = useAntonFonts({
    Anton_400Regular,
  });

  if (!poppinsFontsLoaded || !robotoFontsLoaded || !antonFontsLoaded) {
    return false;
  }

  return true;
};
