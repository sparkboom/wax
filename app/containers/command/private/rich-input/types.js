// @flow

// External
import type {CommandState, Token} from '../../types';

// Props
type RichInputProps = {
  onSetTokens: Array<Token>=>void,
  theme: any,
};

export type Props = CommandState & RichInputProps;
