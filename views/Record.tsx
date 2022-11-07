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
import { color } from '../tokens/index.json';
import type { RootStackParamList, Record } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Record'>) => {
  const tape = useSelector((state: RootState) => getActiveTape(state.tapes));
  const [record, setRecord] = useState(false);

  const thumbsLength = 5;

  const thumbs: string[] = tape && tape.records
    ? tape.records.map((item: Record) => item.thumbUri).slice(-thumbsLength).reverse()
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
        <View style={styles.thumbsWrapper}>
          <View style={styles.thumbsContainer}>
            {thumbs.map((uri: string, index: number) => {
              console.log((thumbsLength) - index)
              console.log(uri)
              return (
                <View style={{
                  ...styles.thumbWrapper,
                  right: index * 15,
                  zIndex: (thumbsLength) - index
                }}
                key={`${index}`}>
                <Image style={{
                  ...styles.thumb,
                  opacity: 1 * (1 - (2 * index) / ( 2 + (2 * index)))
                }} source={{ uri }} />
              </View>
            )})}
          </View>
        </View>
        <RecordButton on={() => setRecord(true)} off={() => setRecord(false)} />
        <View style={styles.controlRight}>

        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordButton: {
    flexShrink: 0,
  },
  thumbsWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbsContainer: {
    display: 'flex',
    width: 60,
    height: 60,
    position: 'relative',
  },
  thumbWrapper: {
    display: 'flex',
    width: 60,
    height: 60,
    backgroundColor: color.black,
    position: 'absolute',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 4,
    objectFit: 'cover',
  },
  controlRight: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
  }
});