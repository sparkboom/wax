// @flow
import * as React from 'react';
import {ToastContainer} from 'react-toastify';
import CommandLine from '../command';
import Canvas from '../canvas';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends React.Component<{}> {

  render() {
    return (
    <Container>
      <Canvas />
      <CommandLine />
      <ToastContainer />
    </Container>)
  }
}

export default App;
