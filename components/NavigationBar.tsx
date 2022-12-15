import React from "react";
import { View, StyleSheet } from "react-native";
import tokens from '../tokens/index.json';

type Props =  {};

export default ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: tokens.space.tiny,
    paddingBottom: tokens.space.small,
  }
});