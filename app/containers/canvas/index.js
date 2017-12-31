import * as React from 'react';
import {connect} from 'react-redux';
import {Shape} from './private';
import {Step, MaxX, Width, Height, Radius, Style} from './constants';
import Layout from './lib/layout';
import * as actions from './actions';
import classNames from 'classnames';
import includes from 'lodash/includes';
// import type {} from './types';

class Canvas extends React.Component<{}> {

  layout = new Layout();

  render() {

    this.layout.reset();
    let {items, toggleSelection, selection} = this.props;
    let getShapeClassName = id => classNames({selected : includes(selection, id) });

    return (
    <svg width="100%" height="100%">
      { items.map( ({shape}, i) => <Shape
              key={i}
              shape={shape}
              layout={this.layout}
              className={getShapeClassName(i)}
              onClick={() => toggleSelection(i)} />) }
    </svg>
    );
  }
}

const connectProps:(State => PropsValues) = state => ({
  ...state.canvas
});
const connectDispatch = dispatch => ({
  toggleSelection: id => dispatch(actions.toggleSelection(id))
});

export default connect(connectProps, connectDispatch)(Canvas);
