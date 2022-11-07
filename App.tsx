import { StyleSheet, SafeAreaView, StatusBar, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './views/Record';
import Home from './views/Home';
import { color } from './tokens/index.json';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { Camera } from 'react-native-vision-camera';
import type { RootStackParamList, Id } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import globalStyles from './styles';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | any>(false);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const requestCameraPermission = async (): Promise<any> => {
    const newCameraPermission = await Camera.requestCameraPermission()
    const newMicrophonePermission = await Camera.requestMicrophonePermission()
    const status = newCameraPermission === 'authorized' && newMicrophonePermission === 'authorized';
    setHasPermission(status);
  };

  const getTapeId = (): Id => {
    return '';
  };

  useEffect(() => {
    requestCameraPermission();
  }, [])

  if (!hasPermission) {
    return(
      <View style={styles.container}>
        <Text style={{ color: color.white }}>No Permission</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
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
              <Stack.Screen name="Record" component={Record} options={{ tapeId: getTapeId() } as NativeStackNavigationOptions} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
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
