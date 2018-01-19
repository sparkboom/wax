// @flow

import * as Types from './types';

// Types

export type SVGState = {
  svg:{
    [string]:Types.Svg
  },
  items: {
    [string]:Types.Shape
  },
};

// Code

export default {
  svg:{},
  items: {},
}
