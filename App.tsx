import { StyleSheet, SafeAreaView, StatusBar, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './screens/Record';
import Home from './screens/Home';
import { color } from './tokens/index.json';
import { Provider } from 'react-redux';
import { store, persistor, getActiveTape } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import useCameraController from './hooks/useCameraController';
import { useState, useEffect } from 'react';
import globalStyles from './styles';
import type { RootStackParamList } from './types';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | any>(false);
  const camera = useCameraController();

  const Stack = createNativeStackNavigator<RootStackParamList>();

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
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                animation: 'fade',
                animationDuration: 100
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Record" component={Record} />
            </Stack.Navigator>
          </NavigationContainer>
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
