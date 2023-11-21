import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const SavePicScreen = ({ navigation, route }) => {
  const { userName, dateTimeString, photoURI } = route.params;
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [capturedImageURI, setCapturedImageURI] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(status === 'granted');
    })();
  }, []);

  const savePhotoToGallery = async () => {
    try {
      if (mediaLibraryPermission) {
        // if persmission is granted, capture the view and save the image
        const uri = await captureRef(capturedViewRef, {
          format: 'jpg',
          quality: 0.8,
        });

        // Save the image to the media library
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log('Photo saved to galler:', asset);

        // Extract the creation time of the asset
        const creationTime = asset.creationTime;

        // Convert the creation time to a localized date and time string
        const date = new Date(creationTime);
        const dateString = date.toLocaleString();

        // Log the creation time as a formatted date string
        console.log('Creation Time:', dateString);

      } else {
        // Log an error message if media library permission is not granted
        console.error('Permission to access media library not granted.');
      }
    } catch (error) {
      // Log an error message if there's an issue saving the photo to the gallery
      console.error('Error saving photo to gallery:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, marginBottom: 10 }}>{userName}</Text>
      <View style={styles.imageContainer} ref={(view) => (capturedViewRef = view)}>
        {photoURI && (
          <Image
            source={{ uri: photoURI }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        {capturedImageURI && (
          <Image
            source={{ uri: capturedImageURI }}
            style={styles.image}
            resizeMode="cover"
            />
        )}
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{dateTimeString}</Text>
            </View>
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
