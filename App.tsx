import {ThemeProvider} from 'styled-components'
import {Dashboard} from './src/Screens/Dashboard'
import {Register} from './src/Screens/Register'
import theme from './src/Global/stytles/theme'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });


  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}
