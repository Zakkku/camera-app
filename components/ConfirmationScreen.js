// ConfirmationScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';

const AnotherScreen = ( { navigation }) => {
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
        source={require('../checkmark.png')}
        style={{ width: 200, height: 200 }}
      />
        <Text style={{fontSize: 26}}>You saved your picture!</Text>
        <Button icon="home" mode="text" onPress={() => navigation.navigate('Login')}>
    Home
  </Button>
    </View>
  );
};

export default AnotherScreen;