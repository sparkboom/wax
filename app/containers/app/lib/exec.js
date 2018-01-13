// @flow

// Types

export type Suggestion = {
  command?:string,
  action?:{
  },
  prediction:?string,
  matched:boolean,
};
type TraverseState = {
  text:string,
  predictions:Array<mixed>,
};

// Code

const CommandTree = {};
const NoMatch = {prediction:null,matched:false};
const ExecMarker = 'EXEC_MARKER';

export const registerCommand:(string,any)=>void = (command, action) => {
  let ptr:any = CommandTree;
  for(let ch of command){
    if (!ptr[ch]){
      ptr[ch] = {};
    }
    ptr=ptr[ch];
  }
  ptr[ExecMarker] || (ptr[ExecMarker] = []);
  ptr[ExecMarker].push(action);
};

// $FlowFixMe
function traverseCommandTree(ptr:any, prediction:string, state:TraverseState){
  for(let ch in ptr){
    if (ch === ExecMarker){
      for(let action of ptr[ExecMarker]){
        state.predictions.push({command:state.text+prediction, prediction, action, matched:true});
      }
    } else {
      traverseCommandTree(ptr[ch], prediction+ch, state);
    }
  }
}

// $FlowFixMe
export const predict:(string=>Array<Suggestion>) = text => {

  let ptr:any = CommandTree;
  let ch;

  // Crawl through the 'linked list over the text'
  for(ch of text){
    if (!ptr[ch]){
      return NoMatch;
    }
    ptr=ptr[ch];
  }

  // Now search for possible predictions
  let state:TraverseState = {
    text,
    predictions:[],
  };
  traverseCommandTree(ptr, '', state);

  return state.predictions;
}
