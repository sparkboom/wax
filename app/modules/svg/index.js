// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Shape} from './private';
import Layout from './lib/layout';
import * as actions from './actions';
import classNames from 'classnames';
import includes from 'lodash/includes';
import * as State from './state';
import * as CanvasState from '../../containers/canvas/state';

// Types

type Store = {
  canvas: CanvasState.CanvasState,
  svg: State.SVGState,
};
type Props = State.SVGState & CanvasState.CanvasState;
type SVGConnectProps = Store => Props;

// Code

class Canvas extends React.Component<Props> {

  layout = new Layout();

  onClickItem = (event:MouseEvent, key:number) => {};

  render() {
    let {items, nodes, selection} = this.props;
    let keys = Object.keys(items);
    this.layout.reset();
    let getShapeClassName = id => classNames({selected : false});

    return (
    <svg width="100%" height="100%" >
      { keys.map( key => <Shape
              key={key}
              shape={items[key].shape}
              name={nodes[key]? nodes[key].name : '...'}
              isSelected={selection.includes(key)}
              layout={this.layout}
              className={getShapeClassName(key)}
              onClick={event => this.onClickItem(event, key)} />) }
    </svg>
    );
  }
}

const connectProps:SVGConnectProps = state => ({
  items: state.svg.items,
  nodes: state.canvas.nodes,
  selection: state.canvas.selection,
});

export default connect(connectProps)(Canvas);
