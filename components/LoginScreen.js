// LoginScreen.js
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const saveUserName = () => {
    // Replace this with Firebase authentication logic to check if the user is an admin
    // Get the entered username
    const enteredUserName = email.trim(); // Trim to remove leading/trailing whitespaces
  
    // Check if the entered username is an admin
    const isAdmin = enteredUserName.toLowerCase() === 'admin';
  
    if (isAdmin) {
      // Navigate to admin screen 
      navigation.navigate('AdminScreen', { userName: enteredUserName });
    } else {
      // Navigate to normal user screen 
      navigation.navigate('AnotherScreen', { userName: enteredUserName });
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 60, color: '#6a1299'  }}>
        React-Native Camera App
      </Text>
    <View>
    <TextInput
      label="Name"
      value={email}
      onChangeText={text => setEmail(text)}
      mode='outlined'
      style={{ width: 300, marginBottom: 6 }} 
    />
    <TextInput
      label="Password"
      value={password}
      onChangeText={text => setPassword(text)}
      mode="outlined"
      secureTextEntry={!passwordVisible}
      style={{ width: 300 }} 
      
    />
    <Button
        icon={passwordVisible ? "eye" : "eye-off"} // Toggle the eye icon based on passwordVisible state
        onPress={togglePasswordVisibility}
        style={{ position: 'absolute', top: 75, right: 0 }}
      />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
    {/* Pass the email (name) to SavePicScreen */}
    <Button style={{ marginRight: 10, width: 130 }} icon="home" mode="contained" onPress={saveUserName}>  
    Login
  </Button>
  <Button  style={{ width: 130 }} icon="account-plus" mode="outlined" >
    Sign up
  </Button>
    </View>
    </View>
  );
};

export default LoginScreen;