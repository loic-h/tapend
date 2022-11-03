import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import golbalStyles from '../styles';
import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import tokens from '../tokens/index.json';

export default ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} />
      <Pressable
        style={styles.newButton}
        onPress={() => navigation.navigate('Record', { tapeId: '123' })}>
        <Text
          style={styles.newButtonPlus}>
          +
        </Text>
        <Text
          style={styles.newButtonText}>
          New Tape
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
  }
});