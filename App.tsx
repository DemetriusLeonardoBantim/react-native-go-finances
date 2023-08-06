import {ThemeProvider} from 'styled-components'
import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import theme from './src/Global/stytles/theme'
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import {Routes} from './src/routes'
import { AuthProvider } from './src/hooks/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });


  return (
    <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}
