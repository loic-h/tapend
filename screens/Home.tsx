import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import Thumb from '../components/Thumb';
import golbalStyles from '../styles';
import { listTapes, resetActive, resetState } from '../store';
import tokens from '../tokens/index.json';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Tape, RootState, Record } from '../types';

export default ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const tapes = useSelector((state: RootState) => listTapes(state.tapes));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`Mounting Home screen with tapes: ${
      tapes.map((tape: Tape) => tape.id).join(', ')
    }`)
  }, []);

  const goToNewRecord = () => {
    dispatch(resetActive());
    navigation.navigate('Record', {})
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} />
      <Pressable
        style={styles.newButton}
        onPress={goToNewRecord}>
        <Text
          style={styles.newButtonPlus}>
          +
        </Text>
        <Text
          style={styles.newButtonText}>
          New Tape
        </Text>
      </Pressable>
      <View style={styles.tapes}>
        {tapes.map((tape: Tape, index: number) => {
          return (
          <View key={index} style={styles.tape}>
            <Text style={{color: tokens.color.white}}>Tape #{index} - {tape.records.length} records</Text>
            <View key={index} style={styles.rail}>
                {tape.records.map((record: Record, index: number) => {
                  return (
                    <Thumb uri={record.thumbUri} key={index} style={styles.thumb} />
                )})}
            </View>
          </View>
        )})}
      </View>
      <Pressable
        style={styles.reset}
        onPress={() => dispatch(resetState())}>
        <Text
          style={styles.newButtonText}>
          Reset
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...golbalStyles.view.default,
    alignItems: 'center',
    justifyContent: 'center',

  },
  newButton: {
    marginTop: 18,
  },
  newButtonPlus: {
    ...golbalStyles.font.default,
    position: 'absolute',
    left: -tokens.font.size.default
  },
  newButtonText: {
    ...golbalStyles.font.default,
    position: 'relative',
    textDecorationLine: 'underline'
  },
  tapes: {
    backgroundColor: 'pink',
    alignSelf: 'stretch',
  },
  tape: {},
  rail: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'violet'
  },
  thumb: {
    width: 90,
    height: 90,
    backgroundColor: 'red',
  },
  reset: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});