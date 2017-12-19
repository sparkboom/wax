import React from 'react';
import { connect } from 'react-redux';
import CommandLine from '../command';

class App extends React.Component {

  render() {
    return (
    <div>
      <CommandLine />
    </div>)
  }
}

export default connect()(App);
