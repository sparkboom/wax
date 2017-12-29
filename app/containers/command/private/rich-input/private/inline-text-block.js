// @flow

import * as React from 'react';
import styled from 'styled-components';
import { getNodeCharIndex } from '../../../../../lib/text-width';

type Props = {
  onSelectCaretIndex: (caretIndex: number) => void,
  children: mixed,
  caretIndex: number,
};

type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const InlineTextBlock = styled.span`
  display: inline-block;
  cursor: text;
`;

class SelectableTextBlock extends React.Component<Props> {

  onMouseDown = (event: MouseEvent) => {
    let selectionInfo = getNodeCharIndex(event);
    console.log('selectionInfo', selectionInfo);
    if (!selectionInfo) {
      return;
    }
    let newIndex : number = selectionInfo.offset;
    this.props.onSelectCaretIndex && this.props.onSelectCaretIndex(newIndex);
  };

  render() {
    return (
      <InlineTextBlock onMouseDown={(e: MouseEvent) => this.onMouseDown(e)} >
        {this.props.children}
      </InlineTextBlock>
    );
  }
}

export default SelectableTextBlock;
