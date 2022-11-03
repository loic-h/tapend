import React from "react";
import { View, StyleSheet } from "react-native";

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
    paddingTop: 6,
    paddingBottom: 21,
  }
});