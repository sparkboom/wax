// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import {InnerRichInput, HiddenInput} from './private';
import keycode from 'keycode';
import * as Selection from './lib/selection';
import * as Types from '../../types';
import range from 'lodash/range';

// Types

export type Props = {
  suggestion:?Types.Suggestion,
  tokens:Array<Types.Token>,
  onInputChange: (?string,string,number,number)=>void,
  onSetSuggestion: ?Types.Suggestion=>void,
  theme: any,
};

type State = {
  isFocussed : boolean
};

// Code

class RichInput extends React.Component<Props, State> {

  inputRef:?Selection.SelectableInputElement = null;

  constructor(props : Props){
    super(props);
    this.state = {
      isFocussed : false
    };
  }

  setFocus = (event:Event) => {
    if (document.activeElement === this.inputRef){
      return;
    }
    this.setState({isFocussed:true});
    this.inputRef && this.inputRef.focus();
    event.preventDefault();
  };

  onInputChange = () => {
    if (this.inputRef){
      const {value, selectionStart, selectionEnd} = this.inputRef;
      this.props.onInputChange(null, value, selectionStart, selectionEnd);
    }
  };

  setSelection(tokenIndex, charIndex) {
    if (!this.inputRef){
      return;
    }

    let index = range(0,tokenIndex)
        .map(i => this.props.tokens[i].text.length)
        .reduce((a,v) => a+v,0) + charIndex;

    this.inputRef && Selection.setCaretIndex(this.inputRef, index);
    this.inputRef && this.props.onInputChange(null, this.inputRef.value, index, index);
  };

  onInputKeyDown = (event:KeyboardEvent) => {

    if (this.inputRef){
      const {value, selectionStart, selectionEnd} = this.inputRef;
      let code:string = keycode(event);
      this.props.onInputChange(code, value, selectionStart, selectionEnd);
    }
  };

  componentDidMount() {
    document.addEventListener('selectionchange', this.onInputChange );
  }

  componentWillUnmount(){
    document.removeEventListener('selectionchange', this.onInputChange );
  }

  render() {
    let {tokens, onSetSuggestion} = this.props;

    const inputValue:string = !!tokens? tokens.reduce((a,v)=> a+v.text, ''):'';
    const isFocussed = this.state.isFocussed;
    return (
      <div style={{width: '100%'}} onClick={this.setFocus} >
        <InnerRichInput
            isFocussed={isFocussed}
            tokens={tokens}
            onTextSelect={(tokenIndex:number, charIndex:number) => this.setSelection(tokenIndex, charIndex)}
            onSelectSuggestion={() => {}}
          />

        <HiddenInput
          innerRef={ref => this.inputRef = ref}
          onKeyDown={this.onInputKeyDown}
          onChange={() => this.onInputChange()}
          onFocus={() => this.setState({isFocussed:true})}
          onBlur={() => this.setState({isFocussed:false})}
          value={inputValue}  />

      </div>
    );
  }
}
export default withTheme(RichInput);
