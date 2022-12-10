import { StyleSheet, Text } from 'react-native';
import globalStyles from '../styles';

type Props = {
  time: number
};

export default ({ time }: Props) => {
  const minutes = (Math.floor(time / 60));
  const seconds = Math.floor(time - minutes * 60);

  const format = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <Text style={ styles.text }>{ format(minutes) }:{ format(seconds) }</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.font.mono
  }
});