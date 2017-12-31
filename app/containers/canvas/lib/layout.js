import {Step, MaxX, Width, Height, Radius} from '../constants';

export default class Layout {

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
