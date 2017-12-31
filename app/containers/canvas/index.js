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

  onClickItem = (event, id) => {

    const {toggleSelection} = this.props;
    toggleSelection(id, event.metaKey);
  };

  render() {
    let {items, toggleSelection, selection, removeSelection} = this.props;
    this.layout.reset();
    let getShapeClassName = id => classNames({selected : includes(selection, id) });

    return (
    <svg width="100%" height="100%" onClick={removeSelection}>
      { items.map( ({shape}, i) => <Shape
              key={i}
              shape={shape}
              layout={this.layout}
              className={getShapeClassName(i)}
              onClick={event => this.onClickItem(event, i)} />) }
    </svg>
    );
  }
}

const connectProps:(State => PropsValues) = state => ({
  ...state.canvas
});
const connectDispatch = dispatch => ({
  toggleSelection: (id, metaKey) => dispatch(actions.toggleSelection(id, metaKey)),
  removeSelection: () => dispatch(actions.removeSelection())
});

export default connect(connectProps, connectDispatch)(Canvas);
