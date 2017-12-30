// @flow
import type {CommandState} from '../../types';

export type Props = CommandState & {
  onTextChange: string=>void,
  onSelectionChange: (number, number)=>void,
  onCompletePrediction: string=>void,
  theme: any,
};
