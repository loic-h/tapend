import { useRoute } from '@react-navigation/native';
import type { RootStackParamList, RootState, Tape } from "../types";
import { RouteProp } from '@react-navigation/native';
import { getTapeById, getActiveTape } from '../store';
import { useSelector } from 'react-redux';

const useCurrentTape = (): Tape | null => {
  const route = useRoute<RouteProp<RootStackParamList, 'Record'>>();

  return useSelector((state: RootState) => {
    if (route.params && route.params.tapeId) {
      return getTapeById(state.tapes, route.params.tapeId);
    }
    return getActiveTape(state.tapes)
  });
};

export default useCurrentTape;