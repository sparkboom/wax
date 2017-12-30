// @flow

export type Props = {
  onTextChange: (SyntheticInputEvent<> => void),
  onSelectionChange: ((number, number) => void),

  text: string,
  selection: {
    start: number,
    length: number,
  },
  knownCommands: Array<string>,

  theme: any,
};
