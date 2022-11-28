import { View, StyleSheet } from 'react-native';
import globalStyles from '../styles';

export default () => {
  return (
    <View style={styles.container}>
      Tape
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
  },
});