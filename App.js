import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// screen
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';





export default function App() {
  const Stack = createNativeStackNavigator();

  function RootStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} options={{
          title: 'Add Entry'
        }} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}


