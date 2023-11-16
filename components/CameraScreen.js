// CameraScreen

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Canvas from 'react-native-canvas';

const CameraScreen = ({ navigation, route }) => {
  const { userName } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [cameraRef, setCameraRef] = useState(null);
  const [dateTimeString, setDateTimeString] = useState('');
  const canvasRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    setFormattedDate(currentDate.toLocaleDateString());
    setCurrentTime(currentDate.toLocaleTimeString());
    setDateTimeString(`${formattedDate} ${currentTime}`);
  }, [formattedDate, currentTime]);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      const imageFileName = `img_${dateTimeString}.jpg`;
    
      navigation.navigate('SavePicScreen', { userName, imageFileName, dateTimeString, photoURI: photo.uri });
    }
  };

  const handleCanvas = (canvas) => {
    // Draw on the canvas
    const context = canvas.getContext('2d');
    context.font = '16px Arial';
    context.fillStyle = 'white';
    context.fillText(dateTimeString, 10, 20);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        ref={(ref) => setCameraRef(ref)}
      />
      <Canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onCanvas={handleCanvas}
      />
      <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <Text style={{ fontSize: 20, color: 'goldenrod' }}>{formattedDate}</Text>
        <Text style={{ fontSize: 20, color: 'goldenrod' }}>{currentTime}</Text>
      </View>
      <TouchableOpacity style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }} onPress={takePicture}>
        <Text style={{ fontSize: 20, color: 'white' }}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
