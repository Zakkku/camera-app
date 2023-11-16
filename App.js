// App.js
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import AnotherScreen from './components/AnotherScreen';
import CameraScreen from './components/CameraScreen';
import SavePicScreen from './components/SavePicScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import AdminScreen from './components/AdminScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="SavePicScreen" component={SavePicScreen} />
          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

