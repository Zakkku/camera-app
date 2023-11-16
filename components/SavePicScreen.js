// SavePicScreen.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const SavePicScreen = ({ navigation, route }) => {
  const { userName, dateTimeString, photoURI } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, marginBottom: 10 }}>{userName}</Text>
      <View style={styles.imageContainer}>
  {photoURI && (
    <ImageBackground
      source={{ uri: photoURI }}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{dateTimeString}</Text>
      </View>
    </ImageBackground>
  )}
</View>

      <Button
        style={{ marginTop: 16 }}
        icon="check"
        mode="contained"
        onPress={() => navigation.navigate('ConfirmationScreen')}
      >
        保存
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  overlayText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SavePicScreen;
