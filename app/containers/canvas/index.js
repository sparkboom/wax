import * as React from 'react';
import {connect} from 'react-redux';
// import {CommandInput, RichInput, RichInputContainer} from './private';
// import * as actions from './actions';
// import type {} from './types';

const Step = 50;
const MaxX = 800;
const Width = 30;
const Height = 30;
const Radius = (Width + Height)/2/2;
const Style = {stroke: 'red', fill: 'transparent', strokeWidth: 2};

class Layout {

  coords = {x:0, y:50};

  reset = () => {

    this.coords = {x:0, y:50};
  }

  getNextCoords = () => {

    if (this.coords.x > MaxX - Step){
      this.coords.x = Step;
      this.coords.y += Step;
    } else {
      this.coords.x += Step;
    }
    return this.coords;
  }

  getNextCCoords = () => {

    let c = this.getNextCoords();
    return {
      cx: c.x+Radius,
      cy: c.y+Radius,
    };
  }
}

const createSquare = (layout, i) => (<rect key={i} {...layout.getNextCoords()} width={Width} height={Height} {...Style} />);
const createTriangle = (layout, i) => null;
const createCircle = (layout, i) => (<circle key={i} {...layout.getNextCCoords()} r={Radius} {...Style} />);
const getShape = shape => {

  const map = {
    'square' : createSquare,
    'triangle' : createTriangle,
    'circle' : createCircle,
  };
  return map[shape];
};


class Canvas extends React.Component<{}> {

  layout = new Layout();

  render() {

    this.layout.reset();

    let {items} = this.props;

    return (
    <svg width="100%" height="100%">
      { items.map(({shape}, i) => getShape(shape)(this.layout, i)) }
    </svg>
    );
  }
}

const connectProps:(State => PropsValues) = state => ({
  ...state.canvas
});

export default connect(connectProps)(Canvas);
