// @flow

export type Coords = {
  x:number,
  y:number
};

export default class Layout {

  static step:number = 55;
  static maxX:number = 800;
  coords:Coords = {x:0, y:50};

  reset:void=>void = () => {

    this.coords = {x:0, y:50};
  }

  getNextCoords:void=>Coords = () => {

    if (this.coords.x > Layout.maxX - Layout.step){
      this.coords.x = Layout.step;
      this.coords.y += Layout.step;
    } else {
      this.coords.x += Layout.step;
    }
    return this.coords;
  }

}
