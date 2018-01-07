// @flow

// Types
export type WaxFunction = {
  command:string,
  action:{
    type:string
  }
}
export type Suggestion = {
  command?:string,
  action?:{
    type:string
  },
  prediction:?string,
  matched:boolean,
};
type Interpreter = string=>Suggestion

//
const waxFunctions = [{
  command:'addcircle',
  action:{
    type:'ADD_SHAPE',
    shape:'circle'}
},{
  command:'addsquare',
  action:{
    type:'ADD_SHAPE',
    shape:'square'}
},{
  command:'addtriangle',
  action:{
    type:'ADD_SHAPE',
    shape:'triangle'}
}];

export const predict:Interpreter = text => {
  if(text.length===0){
    return {prediction: null, matched:false};
  }
  const waxfunc = waxFunctions.find(f => f.command.startsWith(text)) || null;
  const prediction = waxfunc && waxfunc.command.substr(text.length);
  return {...waxfunc, prediction, matched:!!waxfunc};
}
