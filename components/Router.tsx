import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { getActiveTape, RootState } from '../store';
import Record from '../screens/Record';
import Home from '../screens/Home';
import Tape from '../screens/Tape';
import type { RootStackParamList } from '../types';

export default function () {
  const tape = useSelector((state: RootState) => getActiveTape(state.tapes));

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={tape ? 'Tape' : 'Home'}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 100
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Record" component={Record} />
        <Stack.Screen name="Tape" component={Tape} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};