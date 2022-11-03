import { Fragment } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import tokens from '../tokens/index.json';


type Props = {
  on: () => void;
  off: () => void;
};

export default ({ on, off }: React.PropsWithChildren<Props>) => {
  return (
    <View>
      <TouchableHighlight style={styles.button} onPressIn={on} onPressOut={off}>
        <Fragment />
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: tokens.color.red,
  }
});