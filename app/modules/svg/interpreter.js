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

export const createPrediction = (text) => {
  const waxfunc = waxFunctions.find(f => f.command.startsWith(text)) || '';
  const prediction = waxfunx.command.substr(text.length);
  return {...waxfunc, prediction};
}
