// @flow
import * as Types from '../../../types';

// Types

type TraverseState = {
  text:string,
  predictions:Array<Types.Suggestion>,
};

// Code

const MethodTreeByInterface = {};
const NoMatch = {prediction:null,matched:false};
const ExecMarker = 'EXEC_MARKER';
const InterfaceNameMarker = 'IFACE_NAME_MARKER';

export const loadApi = (api:Types.Package) => {
  api.api.interfaceKeys.forEach( iKey => {
    const iface = api.interfaces.find( i => i.interfaceKey === iKey);
    iface && iface.methodKeys.forEach( mKey => {
      const method = api.methods.find( i => i.interfaceKey === iKey);
      method && indexMethod(iface, method.methodName, method.action);
    })
  });
};


const indexMethod:(Types.Interface,string,any)=>void = (iface, methodName, action) => {
  let ptr:any = MethodTreeByInterface;
  if(!ptr[iface.interfaceKey]){
    ptr[iface.interfaceKey] = {
      [InterfaceNameMarker]:iface.interfaceName
    };
  }
  ptr = ptr[iface.interfaceKey];

  for(let ch of methodName){
    if (!ptr[ch]){
      ptr[ch] = {};
    }
    ptr = ptr[ch];
  }
  ptr[ExecMarker] || (ptr[ExecMarker] = []);
  ptr[ExecMarker].push(action);
  console.log('MethodTreeByInterface', MethodTreeByInterface);
};

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

type Predictor = (Array<string>,string)=>Array<Types.Suggestion>;
export const suggest:Predictor = (context=[], text) => {
  let suggestions = [];
  context.forEach(interfaceKey => {
    let ifaceSuggestions = suggestionsForInterface(interfaceKey, text);
    if (ifaceSuggestions !== NoMatch){
      ifaceSuggestions.forEach(s => s.interfaceKey = interfaceKey);
      suggestions = suggestions.concat(ifaceSuggestions);
    }
  });
  return suggestions;
}

function suggestionsForInterface(interfaceKey:string, text:string):Array<Types.Suggestion> {
  console.log('predict', interfaceKey, text);

  let ptr:any = MethodTreeByInterface[interfaceKey];
  let ch;

  // Crawl through the 'linked list over the text'
  for(ch of text){
    if (!ptr[ch]){
      return [NoMatch];
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
