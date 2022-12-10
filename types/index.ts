import type { RootState } from '../store';

export type Id = string;

export type Tape = {
  id: Id;
  // added: string;
  // modified: string;
  // order: string;
  // name: string;
  records: Record[];
}

export type Record = {
  videoUri: string;
  thumbUri: string;
  duration: number;
}

export type Tapes = Tape[];

export type RootStackParamList = {
  Home: undefined;
  Record: {
    tapeId?: string;
  };
  Tape: {
    tapeId?: string;
  }
};

export type { RootState };