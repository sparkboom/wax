// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import { createSelector } from 'reselect';
import { getNodeCharIndex } from '../../../../lib/text-width';
import last from 'lodash/last';
import {Caret, InnerRichInput, InlineTextBlock, HiddenInput} from './private';
import {getPreText, getPostText} from './selectors';
import keycode from 'keycode';
import classNames from 'classnames';
import {setCaretIndex} from '../../../../lib/selection';
import type {SelectableInputElement} from '../../../../lib/selection';

type Props = {
  onTextChange: (SyntheticInputEvent<> => void),
  onSelectCaretIndex: (caretIndex: number) => void,
  inputRef: HTMLDivElement,
  value: string,
  caretIndex: number,
  theme: any,
};
type State = {
  isFocussed : boolean
};

class RichInput extends React.Component<Props, State> {

  inputRef : ?SelectableInputElement = null;

  constructor(props : Props){
    super(props);
    this.state = {
      isFocussed : false};
  }

  setFocus = (event : Event) => {

    if (document.activeElement === this.inputRef){
      return;
    }

    this.setState({isFocussed:true});
    this.inputRef && this.inputRef.focus();
    event.preventDefault();
  };

  setCaretPosition(caretIndex) {
    console.log('setCaretPosition', this, caretIndex);

    let {onSelectCaretIndex} = this.props;
    this.inputRef && setCaretIndex(this.inputRef, caretIndex)
    onSelectCaretIndex && onSelectCaretIndex(caretIndex);
  }

  render() {
    const {inputRef, value, caretIndex, onTextChange, onSelectCaretIndex} = this.props;

    const innerRichInputClassName : string = classNames({
      focussed: this.state.isFocussed
    });

    return (
      <div style={{width: '100%'}} onClick={this.setFocus} >
        <InnerRichInput className={innerRichInputClassName}>
          <InlineTextBlock onSelectCaretIndex={(index : number) => this.setCaretPosition(index)}>{getPreText(this.props)}</InlineTextBlock>
          { this.state.isFocussed && <Caret /> }
          <InlineTextBlock onSelectCaretIndex={(index : number) => this.setCaretPosition(index + caretIndex)}>{getPostText(this.props)}</InlineTextBlock>
        </InnerRichInput>

        <HiddenInput
          innerRef={ref => this.inputRef = ref}
          onFocus={() => this.setState({isFocussed:true})}
          onBlur={() => this.setState({isFocussed:false})}
          onChange={onTextChange}
          value={value}  />
      </div>
    );
  }
}

export default withTheme(RichInput);
