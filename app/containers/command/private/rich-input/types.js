// @flow
import type {CommandState} from '../../types';

// Props
type RichInputProps = {
  onTextChange: string=>void,
  onSelectionChange: (number, number)=>void,
  onCreateToken: {}=>void,
  onExecuteActions: Array<mixed>=>void,
  theme: any,
  tokens: Array<mixed>,
};

export type Props = CommandState & RichInputProps;
