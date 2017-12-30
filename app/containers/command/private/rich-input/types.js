// @flow
import type {CommandState} from '../../types';

export type Props = CommandState & {
  onTextChange: string=>void,
  onSelectionChange: (number, number)=>void,
  onCompletePrediction: string=>void,
  onExecuteActions: Array<mixed>=>void,
  theme: any,
};
