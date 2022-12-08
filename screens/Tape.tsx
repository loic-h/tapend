import { View, StyleSheet, Text, Pressable } from 'react-native';
import globalStyles from '../styles';
import BackIcon from '../components/icons/Back';
import NavigationBar from '../components/NavigationBar';
import tokens from '../tokens/index.json';
import type { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Tape'>) => {
  const goBack = () => {
    navigation.navigate('Record', { tapeId: route.params.tapeId });
  };

  return (
    <View style={styles.container}>
      <NavigationBar>
        <Pressable onPress={ goBack }>
          <BackIcon color={tokens.color.white} width="21" height="21" />
        </Pressable>
        <Text style={styles.headline}>Tape {route.params.tapeId}</Text>
      </NavigationBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
  headline: {
    ...globalStyles.font.bold
  }
});