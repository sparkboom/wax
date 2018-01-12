// @flow

import * as svg from '../../../modules/svg/container/lib/exec';

// Types
export type WaxFunction = {
  command:string,
  action:{
    type:string,
  }
}
export type Suggestion = {
  command?:string,
  action?:{
  },
  prediction:?string,
  matched:boolean,
};
type Interpreter = string=>Suggestion

//
const waxAppFunctions = [{
  command:'throwerror',
  action: {type:'GLOBAL:THROW_ERROR'},
}];

const waxFunctions = [
  ...waxAppFunctions,
  ...svg.waxFunctions,
];

export const predict:Interpreter = text => {
  if(text.length===0){
    return {prediction: null, matched:false};
  }
  const waxfunc = waxFunctions.find(f => f.command.startsWith(text)) || null;
  const prediction = waxfunc && waxfunc.command.substr(text.length);
  return {...waxfunc, prediction, matched:!!waxfunc};
}