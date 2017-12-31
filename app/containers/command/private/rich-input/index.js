// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import {Caret, InnerRichInput, InlineTextBlock, SelectedInlineTextBlock, HiddenInput, PredictionInlineTextBlock, TokenInlineTextBlock} from './private';
import {getPreText, getSelectedText, getPostText, getPredictionText} from './selectors';
import classNames from 'classnames';
import keycode from 'keycode';
import {setCaretIndex} from '../../../../lib/selection';
import type {SelectableInputElement} from '../../../../lib/selection';
import type {Props} from './types';

type State = {
  isFocussed : boolean
};

class RichInput extends React.Component<Props, State> {
  inputRef : ?SelectableInputElement = null;
  constructor(props : Props){
    super(props);
    this.state = {
      isFocussed : false
    };
  }

  setFocus = (event : Event) => {
    if (document.activeElement === this.inputRef){
      return;
    }
    this.setState({isFocussed:true});
    this.inputRef && this.inputRef.focus();
    event.preventDefault();
  };

  setSelection(selectionStart) {
    let {onSelectionChange} = this.props;
    this.inputRef && setCaretIndex(this.inputRef, selectionStart)
    onSelectionChange && onSelectionChange(selectionStart, 0);
  }

  onInputKeyPress = (event:KeyboardEvent) => {

    let {onCompletePrediction, onExecuteActions, text, tokens} = this.props;
    let code:string = keycode(event);
    let prediction:string = getPredictionText(this.props);
    if (code === 'enter' && prediction.length>0){
      onCompletePrediction(text+prediction);
    } else if (code === 'enter' && text.length === 0 && tokens.length > 0 ){
      onExecuteActions(tokens);
    }
  };

  onSelectionChange = event => {
    let input = this.inputRef;
    input && this.props.onSelectionChange(input.selectionStart, input.selectionEnd - input.selectionStart);
  };

  componentDidMount() {

    document.addEventListener('selectionchange', this.onSelectionChange );
  }

  componentWillUnmount(){

    document.removeEventListener('selectionchange', this.onSelectionChange );
  }

  render() {
    const {text, selection, tokens, onTextChange, onSelectionChange} = this.props;

    const innerRichInputClassName : string = classNames({
      focussed: this.state.isFocussed
    });

    return (
      <div style={{width: '100%'}} onClick={this.setFocus} >
        <InnerRichInput className={innerRichInputClassName}>
          { tokens.map( (t,i) => <TokenInlineTextBlock key={i}>shape.{t.args.shape}</TokenInlineTextBlock> ) }
          <InlineTextBlock onTextSelect={(index : number) => this.setSelection(index)}>{getPreText(this.props)}</InlineTextBlock>
          { this.state.isFocussed && selection.length===0 && <Caret /> }
          <SelectedInlineTextBlock onTextSelect={(index : number) => this.setSelection(index + selection.start)}>{getSelectedText(this.props)}</SelectedInlineTextBlock>
          <InlineTextBlock onTextSelect={(index : number) => this.setSelection(index + selection.start + selection.length)}>{getPostText(this.props)}</InlineTextBlock>
          <PredictionInlineTextBlock>{getPredictionText(this.props)}</PredictionInlineTextBlock>
        </InnerRichInput>

        <HiddenInput
          innerRef={ref => this.inputRef = ref}
          onFocus={() => this.setState({isFocussed:true})}
          onBlur={() => this.setState({isFocussed:false})}
          onChange={(event:any) => onTextChange(event.target.value)}
          onKeyPress={this.onInputKeyPress}
          value={text}  />
      </div>
    );
  }
}

export default withTheme(RichInput);
