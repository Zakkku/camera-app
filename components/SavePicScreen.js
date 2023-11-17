import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';

const SavePicScreen = ({ navigation, route }) => {
  const { userName, dateTimeString, photoURI } = route.params;
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === 'granted');
    })();
  }, []);

  const savePhotoToGallery = async () => {
    try {
      if (mediaLibraryPermission) {
        const asset = await MediaLibrary.createAssetAsync(photoURI);
        console.log('Photo saved to gallery:', asset);
        const creationTime = asset.creationTime;
        const date = new Date(creationTime);
        const dateString = date.toLocaleString(); // Convert to a localized date and time string
        console.log('Creation Time:', dateString);
      } else {
        console.error('Permission to access media library not granted.');
      }
    } catch (error) {
      console.error('Error saving photo to gallery:', error);
    }
  };

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
        onPress={() => {
          savePhotoToGallery(); // Save photo to gallery
          navigation.navigate('ConfirmationScreen'); // Navigate to ConfirmationScreen
        }}
      >
        Save Picture
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
