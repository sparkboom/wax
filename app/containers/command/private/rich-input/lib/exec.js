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

const MethodTreeByClassName = {};
const NoMatch = {prediction:null,matched:false};
const ExecMarker = 'EXEC_MARKER';

export const registerCommand:(string,string,any)=>void = (className, methodName, action) => {
  let ptr:any = MethodTreeByClassName;
  if(!ptr[className]){
    ptr[className] = {};
  }
  ptr = ptr[className];

  for(let ch of methodName){
    if (!ptr[ch]){
      ptr[ch] = {};
    }
    ptr = ptr[ch];
  }
  ptr[ExecMarker] || (ptr[ExecMarker] = []); 
  ptr[ExecMarker].push(action);
  console.log('MethodTreeByClassName', MethodTreeByClassName);
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
type Predictor = (string,string)=>Array<Suggestion>;
export const predict:Predictor = (className, text) => {
  console.log('predict', className, text);

  let ptr:any = MethodTreeByClassName[className];
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
