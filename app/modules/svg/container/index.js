// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Shape} from './private';
import Layout from './lib/layout';
import * as actions from './actions';
import classNames from 'classnames';
import includes from 'lodash/includes';
import * as State from './state';
import * as CanvasState from '../../../containers/canvas/state';

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

  onClickItem = (event:MouseEvent, id:number) => {};

  render() {
    let {items, nodes} = this.props;
    this.layout.reset();
    let getShapeClassName = id => classNames({selected : false });

    return (
    <svg width="100%" height="100%" >
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

const connectProps:SVGConnectProps = state => ({
  items: state.svg.items,
  nodes: state.canvas.nodes,
});

export default connect(connectProps)(Canvas);
