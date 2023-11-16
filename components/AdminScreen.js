// AdminScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const AdminScreen = ({ route, navigation }) => {
  // Extract the userName from the navigation params
  const { userName } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Welcome to the Admin Screen! </Text>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Logged in as: {userName}</Text>
      {/* Add admin-specific content and functionalities here */}
      <Button
        title="Logout"
        onPress={() => {
          // Navigate back to the login screen
          navigation.popToTop();
        }}
      />
    </View>
  );
};

export default AdminScreen;
