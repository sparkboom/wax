// @flow
import * as React from 'react';
import CommandLine from '../command';
import Canvas from '../canvas';
import styled from 'styled-components';

import {interpreter} from '../../modules/';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends React.Component<{}> {

  render() {
    return (
    <Container>
      <Canvas />
      <CommandLine interpreter={interpreter} />
    </Container>)
  }
}

export default App;
