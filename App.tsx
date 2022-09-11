import {ThemeProvider} from 'styled-components'
import {Dashboard} from './src/Screens/Dashboard'
import {Register} from './src/Screens/Register'
import {CategorySelect} from './src/Screens/CategorySelect'
import theme from './src/Global/stytles/theme'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import {AppRoutes} from './src/routes/app.routes'
import {NavigationContainer} from '@react-navigation/native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
