import { useEffect, useCallback } from 'react';
import { Button, StyleSheet, Text, SafeAreaView, View, StatusBar} from 'react-native';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './views/Record';
import Home from './views/Home';
import { color } from './tokens/index.json';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import type { RootStackParamList, Id } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-Mono': require('./assets/fonts/RobotoMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const getTapeId = (): Id => {
    return '';
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
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
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: color.black,
    color: color.white,
  },
});
