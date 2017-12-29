// @flow

import * as React from 'react';
import styled, {keyframes, withTheme} from 'styled-components';
import { createSelector } from 'reselect';
import { getNodeCharIndex } from '../../../../lib/text-width';
import last from 'lodash/last';
import {Caret, InnerRichInput, InlineTextBlock} from './private';

type Props = {
  onKeyPress: (event: SyntheticKeyboardEvent<>) => void,
  onSelectCaretIndex: (caretIndex: number) => void,
  inputRef: HTMLDivElement,
  value: string,
  caretIndex: number,
  theme: any,
};
type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const UNICODE_NARROW_NOBREAK_SPACE = '\u202F';

const getValue = (props: Props) => props.value;
const getCaretIndex = (props : Props) => props.caretIndex;
const getPreText : (props: Props) => string = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substr(0, caretIndex).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );
const getPostText : (props: Props) => string = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substring(caretIndex, value.length).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );

class RichInputContainer extends React.Component<Props> {

  pretextSpan: ?HTMLSpanElement;
  posttextSpan: ?HTMLSpanElement;

  onMouseDown = (event: MouseEvent, el: ?HTMLSpanElement ) => {
    let selectionInfo = getNodeCharIndex(event);
    console.log('selectionInfo', selectionInfo);
    if (!selectionInfo) {
      return;
    }
    let newIndex : number = selectionInfo.offset + (el===this.pretextSpan? 0 : this.props.caretIndex);
    this.props.onSelectCaretIndex && this.props.onSelectCaretIndex(newIndex);
  };

  render() {
    let preText : string = getPreText(this.props);
    let postText : string = getPostText(this.props);

    return (
      <InnerRichInput
        tabIndex="0"
        onKeyPress={this.props.onKeyPress}
        innerRef={this.props.inputRef}
        >
          <InlineTextBlock
            ref={r => this.pretextSpan = r}
            onMouseDown={(e: MouseEvent) => this.onMouseDown(e, this.pretextSpan)}
            >{preText}</InlineTextBlock>
          <Caret />
          <InlineTextBlock
            ref={r => this.posttextSpan = r}
            onMouseDown={(e: MouseEvent) => this.onMouseDown(e, this.posttextSpan)}
            >{postText}</InlineTextBlock>
      </InnerRichInput>
    );
  }
}

export default withTheme(RichInputContainer);
