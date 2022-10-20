
import { Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { Camera } from 'expo-camera';
import Record from './views/Record';


export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  const getTapeId = ():string => {
    return '123';
  };

  return (
    <View style={styles.container}>
      <Record tapeId={getTapeId()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
