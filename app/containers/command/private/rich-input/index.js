import React from 'react';
import styled, {keyframes, withTheme} from 'styled-components';
import { createSelector } from 'reselect';
import { getNodeCharIndex } from '../../../../lib/text-width';
import last from 'lodash/last';

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Caret = styled.div`
  display: inline-block;
  font-size: 1em;
  height: 1.2em;
  border-left: solid thin ${p => p.theme.textColor};
  max-width: 0px;
  animation: 1s ${blink} step-end infinite;
  position: relative;
  left: 0;
  top: 10px;
  padding: 0;
  margin: 0;
`;

const RichInput = styled.div`

  color: ${p => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  text-align: center;
  line-height: 1.2em;
  padding: .7em 1em;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.5em;
  box-shadow: none;

  font-family: system-ui;
  font-size: 40px;
  font-weight: lighter;
  border: solid thin blue;

  &:focus {
    border: solid thin red;
  }
`;

const InlineTextBlock = styled.span`
  display: inline-block;
  cursor: text;
`;

const UNICODE_NARROW_NOBREAK_SPACE = '\u202F';

const getValue = p => p.value;
const getCaretIndex = p => p.caretIndex;
// In future use a scanner here
const getPreText = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substr(0, caretIndex).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );
const getPostText = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substring(caretIndex, value.length).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );

class RichInputContainer extends React.Component {

  pretextSpan = null;
  posttextSpan = null;

  onMouseDown = (event, el) => {
    let selectionInfo = getNodeCharIndex(event);
    console.log('selectionInfo', selectionInfo);
    let newIndex = selectionInfo.offset + (el===this.pretextSpan? 0 : this.props.caretIndex);
    this.props.onSelectCaretIndex && this.props.onSelectCaretIndex(newIndex);
  };

  render() {
    let preText = getPreText(this.props);
    let postText = getPostText(this.props);

    return (
      <RichInput
        tabIndex="0"
        onKeyPress={this.props.onKeyPress}
        innerRef={this.props.inputRef}
        >
          <InlineTextBlock
            ref={r => this.pretextSpan = r}
            onMouseDown={e => this.onMouseDown(e, this.pretextSpan)}
            >{preText}</InlineTextBlock><Caret /><InlineTextBlock
            ref={r => this.posttextSpan = r}
            onMouseDown={e => this.onMouseDown(e, this.posttextSpan)}
            >{postText}</InlineTextBlock>
      </RichInput>
    );
  }
}

export default withTheme(RichInputContainer);
