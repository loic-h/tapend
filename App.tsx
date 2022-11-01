import { Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './views/Record';
import Home from './views/Home';
import type { RootStackParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  const getTapeId = ():string => {
    return '123';
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Record" component={Record} options={{ tapeId: '123' } as NativeStackNavigationOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
});
