// @flow
import {addAction} from './container/actions';

// Types
export type WaxFunction = {
  command:string,
  action:{
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
const waxFunctions = [{
  command:'addcircle',
  action: addAction('circle'),
},{
  command:'addsquare',
  action: addAction('square'),
},{
  command:'addtriangle',
  action: addAction('triangle'),
}];

export const predict:Interpreter = text => {
  if(text.length===0){
    return {prediction: null, matched:false};
  }
  const waxfunc = waxFunctions.find(f => f.command.startsWith(text)) || null;
  const prediction = waxfunc && waxfunc.command.substr(text.length);
  return {...waxfunc, prediction, matched:!!waxfunc};
}
