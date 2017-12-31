import * as React from 'react';
import {connect} from 'react-redux';
import {Shape} from './private';
import {Step, MaxX, Width, Height, Radius, Style} from './constants';
import Layout from './lib/layout';
// import * as actions from './actions';
// import type {} from './types';

class Canvas extends React.Component<{}> {

  layout = new Layout();

  render() {

    this.layout.reset();
    let {items} = this.props;

    return (
    <svg width="100%" height="100%">
      { items.map( ({shape}, i) => <Shape key={i} shape={shape} layout={this.layout} />) }
    </svg>
    );
  }
}

const connectProps:(State => PropsValues) = state => ({
  ...state.canvas
});

export default connect(connectProps)(Canvas);
