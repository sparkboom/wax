import React from 'react';
import {connect} from 'react-redux';

import styled from 'styled-components';
import {CommandInput} from '../../components';

import * as actions from './actions';

const InputContainer = styled.div `
  display: flex;
  text-align: center;
  position: absolute;
  margin: 0;
  padding: 20px 60px;
  bottom: 0;
  left: 0;
  right: 0;
`;

class Canvas extends React.Component {

  render() {
    let {inputChange, currentInput, inputSet} = this.props;
    return (
    <div>
      <InputContainer>
        <CommandInput
          autoFocus
          onChange={inputChange}
          onInput={inputSet} />
      </InputContainer>
    </div>);
  }
}

export default connect(props => ({
  currentInput: props.canvas.currentInput
}), dispatch => ({
  inputChange: event => dispatch(actions.inputChange(event.target.value)),
  inputSet: event => dispatch(actions.inputSet(event.target.value)),
}))(Canvas);
