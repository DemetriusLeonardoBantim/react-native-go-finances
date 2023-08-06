import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { SignIn } from '../Screens/SignIn';


const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    const theme = useTheme();

  return(
    <Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Screen 
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  )
}