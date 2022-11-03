import { View, StyleSheet, Pressable, TouchableHighlight } from "react-native";
import { Camera } from 'expo-camera';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import tokens from '../tokens/index.json';
import NavigationBar from '../components/NavigationBar';
import RecordButton from '../components/RecordButton';
import AddIcon from '../components/icons/Add';
import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  let camera: Camera | null = new Camera({});

  const startRecording = async ():Promise<void> => {
    if(camera) {
      const data = await camera.recordAsync();
      // await afterRecord(data.uri);
    }
  };

  const stopRecording = async ():Promise<void> => {
    camera?.stopRecording();
  };

  const Mark = () => <AddIcon
    color={ tokens.color.white }
    width="12" height="12" />

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ () => navigation.goBack() }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
      </NavigationBar>
      <View style={ styles.cameraWrapper }>
        <Camera style={styles.camera} ref={ref => camera = ref}>
          <View style={styles.markLine}>
            <Mark />
            <Mark />
          </View>
          <View style={styles.markLine}>
            <Mark />
            <Mark />
          </View>
        </Camera>
      </View>
      <View style={styles.controls}>
        <RecordButton on={startRecording} off={stopRecording} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  cameraWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: -15,
    marginRight: -15,
    position: 'relative',
  },
  camera: {
    display: 'flex',
    backgroundColor: 'red',
    aspectRatio: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  markLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordButton: {

  }
});