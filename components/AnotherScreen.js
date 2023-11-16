// AnotherScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';




const AnotherScreen = ({ navigation, route }) => {
  const { userName } = route.params; // Retrieve the user's name
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const currentTime = currentDate.toLocaleTimeString();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Hello, {userName}</Text>
      <Text>{formattedDate}</Text>
      <Text>{currentTime}</Text>
      {/* Pass the user name */}
      <Button style={{ marginTop: 20}} icon="plus" mode="contained" onPress={() => navigation.navigate('CameraScreen', { userName })} > 
      Open Camera
      </Button>
    </View>
  );
};

export default AnotherScreen;