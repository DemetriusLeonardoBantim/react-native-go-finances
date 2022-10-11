import {ThemeProvider} from 'styled-components'
import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import theme from './src/Global/stytles/theme'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import {AppRoutes} from './src/routes/app.routes'
import {NavigationContainer} from '@react-navigation/native'
import { AuthContext } from './src/AuthContext'

import {SignIn} from './src/Screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider value={[]}>
          <SignIn />
        </AuthContext.Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
