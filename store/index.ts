import { combineReducers, configureStore, createSlice, nanoid } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, PERSIST } from 'redux-persist'
import type { Tape, Id, Record } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';

type TapesItems = { [id: Id]: Tape };

export type TapesState = {
  active: Id | null,
  items: TapesItems,
  byId: Id[],
}

const initialTapesState: TapesState = {
  active: null,
  items: {},
  byId: [],
};

const tapes = createSlice({
  name: 'tapes',
  initialState: initialTapesState,
  reducers: {
    addTape(state, action: PayloadAction<Tape>) {
      const id = nanoid();
      state.items[id as keyof TapesItems] = action.payload;
      state.byId.push(id);
    },
    addRecord(state, action: PayloadAction<Record>) {
      let tape: Tape | null = getActiveTape(state);
      if (!tape) {
        tape = {
          id: nanoid(),
          records: []
        };
        addTape(state, tape);
        state.active = tape.id;
      }
      // In case of a new tape, we set the active value to the newly created id
      state.active = tape.id;
      tape.records.push(action.payload);
      console.log(state, tape.records)
    },
    // TODO: RUD actions for records
  }
});

export const getActiveTape = (state: TapesState): Tape | null  => {
  console.log('getActiveTape', state.active)
  if (typeof state.active !== 'string') {
    return null;
  }
  return state.items[state.active];
}

const addTape = (state: TapesState, tape: Tape): void => {
  state.items[tape.id] = tape;
  state.byId.push(tape.id);
}

const reducer = combineReducers({
  tapes: tapes.reducer
});

export type RootState = ReturnType<typeof reducer>;

export const { addRecord } = tapes.actions;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: { ignoredActions: [PERSIST] },
    }),
});

export const persistor = persistStore(store)