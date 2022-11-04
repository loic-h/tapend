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
  // tapeId: string;
}

export type Tapes = [Tape];

export type RecordProps = { tapeId: string | null };

export type RootStackParamList = {
  Home: undefined;
  Record: RecordProps;
};