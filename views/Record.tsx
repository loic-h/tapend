import { useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import Camera from '../components/Camera';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import tokens from '../tokens/index.json';
import NavigationBar from '../components/NavigationBar';
import RecordButton from '../components/RecordButton';
import { useSelector } from "react-redux";
import { getActiveTape, RootState } from '../store';
import type { RootStackParamList, Record } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  const tape = useSelector((state: RootState) => getActiveTape(state.tapes));
  const [record, setRecord] = useState(false);

  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-3)
    : [] ;

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ () => navigation.goBack() }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
      </NavigationBar>
      <Camera record={record} />
      <View style={styles.controls}>
        <View style={styles.thumbWrapper}>
          <View style={styles.thumbContainer}>
            {thumbs.map((uri: string, index: Number) => {
              return <Image style={styles.thumb} source={{ uri }} key={`${index}`} />
            })}
          </View>
        </View>
        <RecordButton on={() => setRecord(true)} off={() => setRecord(false)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordButton: {

  },
  thumbWrapper: {
    flexGrow: 1,
    flexShrink: 0,
  },
  thumbContainer: {
    display: 'flex',
    width: 60,
    height: 60,
    position: 'absolute',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'red',
    objectFit: 'cover',
  },
});