// @flow

import * as React from 'react';
import {ToastContainer} from 'react-toastify';
import CommandLine from '../command';
import Canvas from '../canvas';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as Actions from './actions';

// Types

type PropsDispatch = {
  init: ()=>void
}
type Props = PropsDispatch;

// Code

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends React.Component<Props> {

  componentDidMount = () => {
    this.props.init();
  };

  render() {
    return (
    <Container>
      <Canvas />
      <CommandLine />
      <ToastContainer />
    </Container>)
  }
}

const connectActions = dispatch => ({
  init: () => dispatch(Actions.init())
});

export default connect(null, connectActions)(App);
