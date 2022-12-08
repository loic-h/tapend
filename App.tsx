import { StyleSheet, SafeAreaView, StatusBar, View, Text} from 'react-native';

import Router from './components/Router';
import { color } from './tokens/index.json';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import useCameraController from './hooks/useCameraController';
import { useState, useEffect } from 'react';
import globalStyles from './styles';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | any>(false);
  const camera = useCameraController();


  useEffect(() => {
    camera.requestPermissions()
      .then((hasPermission: boolean) => {
        setHasPermission(hasPermission)
    });
  }, []);

  return (
    <Provider store={store}>
      { !hasPermission ? (
        <View style={styles.container}>
        <Text style={{ color: color.white }}>No Permission</Text>
      </View>
      ) : (
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={globalStyles.view.default}>
          <StatusBar backgroundColor='transparent' barStyle='light-content' />
          <Router />
        </SafeAreaView>
      </PersistGate>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.view.default,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
