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

  const goToTape = (tapeId: string) => {
    navigation.navigate('Record', {tapeId });
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
          <Pressable key={index} style={styles.tape} onPress={() => goToTape(tape.id)}>
            <Text style={styles.tapeHeadline}>Tape #{index}</Text>
            <View key={index} style={styles.rail}>
              <View style={styles.railContainer}>
                {tape.records.map((record: Record, index: number) => {
                  return (
                    <Thumb uri={record.thumbUri} key={index} style={{
                      ...styles.thumb,
                      ...(index === 0 ? styles.thumbFirst : {}),
                    }} />
                )})}
              </View>
            </View>
          </Pressable>
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
    display: 'flex',
    width: '100%',
  },
  tape: {
    display: 'flex',
    marginTop: tokens.space.large,
  },
  tapeHeadline: {
    ...golbalStyles.font.bold,
    marginBottom: tokens.space.tiny,
  },
  rail: {
    display: 'flex',
    flexDirection: 'row',
  },
  railContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexShrink: 1,
    width: 'auto'
  },
  thumb: {
    width: 90,
    height: 90,
    marginLeft: tokens.space.tiny,
  },
  thumbFirst: {
    marginLeft: 0,
  },
  reset: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});