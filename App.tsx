import { Camera } from 'expo-camera';
import { useState, Fragment } from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function startRecording():Promise<void> {
    if(camera){
      const data = await camera.recordAsync()
      setRecord(data.uri);
      console.log(data.uri);
    }
  }

  function stopRecording():void {
    camera.stopRecording();
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={ref => setCamera(ref)}>
        <View style={styles.cameraPlaceholder} />
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPressIn={startRecording} onPressOut={stopRecording}>
            <Fragment />
          </TouchableHighlight>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  camera: {
    display: 'flex',
    flexGrow: 1,
  },
  cameraPlaceholder: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 32,
  },
  button: {
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
