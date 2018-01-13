// @flow

import {addShape} from '../actions';
import {registerCommand} from '../../../../containers/app/lib/exec';

// Code

registerCommand('addcircle', addShape('circle', null));
registerCommand('addsquare', addShape('square', null));
registerCommand('addtriangle', addShape('triangle', null));
