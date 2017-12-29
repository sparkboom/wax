// @flow

import * as React from 'react';
import styled, {keyframes, withTheme} from 'styled-components';
import { createSelector } from 'reselect';
import { getNodeCharIndex } from '../../../../lib/text-width';
import last from 'lodash/last';
import {Caret, InnerRichInput, InlineTextBlock} from './private';
import {getPreText, getPostText} from './selectors';

type Props = {
  onKeyPress: (event: SyntheticKeyboardEvent<>) => void,
  onSelectCaretIndex: (caretIndex: number) => void,
  inputRef: HTMLDivElement,
  value: string,
  caretIndex: number,
  theme: any,
};

class RichInput extends React.Component<Props> {

  render() {
    const {onKeyPress, inputRef, value, caretIndex, onSelectCaretIndex} = this.props;

    return (
      <InnerRichInput tabIndex="0" onKeyPress={onKeyPress} innerRef={inputRef}>
        <InlineTextBlock onSelectCaretIndex={onSelectCaretIndex}>{getPreText(this.props)}</InlineTextBlock>
        <Caret />
        <InlineTextBlock onSelectCaretIndex={(index : number) => onSelectCaretIndex(index + caretIndex)}>{getPostText(this.props)}</InlineTextBlock>
      </InnerRichInput>
    );
  }
}

export default withTheme(RichInput);
