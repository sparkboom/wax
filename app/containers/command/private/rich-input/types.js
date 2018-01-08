// @flow

// External
import type {CommandState, Token} from '../../types';

// Props
type RichInputProps = {
  onSetTokens: Array<Token>=>void,
  // onTextChange: string=>void,
  // onSelectionChange: (number, number)=>void,
  // onCreateToken: {}=>void,
  // onRemoveToken: number[]=>void,
  // onExecuteActions: Array<Token>=>void,
  theme: any,
};

export type Props = CommandState & RichInputProps;
