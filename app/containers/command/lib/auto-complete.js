// @flow
import * as Types from '../../../types';

// Types

type TraverseState = {
  queryText:string,
  suggestions:Array<Types.Suggestion>,
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
      const method = api.methods.find( m => m.methodKey === mKey);
      method && indexMethod(iface, method.methodName, method.methodKey);
    })
  });
  console.log('MethodTreeByInterface', MethodTreeByInterface);
};

type IndexMethod = (Types.Interface,string,any)=>void;
export const indexMethod:IndexMethod = (iface, methodName, methodKey) => {
  let ptr:any = MethodTreeByInterface;
  if(!ptr[iface.interfaceKey]){
    ptr[iface.interfaceKey] = {
      [InterfaceNameMarker]:iface.interfaceName
    };
  }
  ptr = ptr[iface.interfaceKey];

  const fullMethodName = '.'+methodName;
  for(let ch of fullMethodName){
    if (!ptr[ch]){
      ptr[ch] = {};
    }
    ptr = ptr[ch];
  }
  ptr[ExecMarker] || (ptr[ExecMarker] = []);
  ptr[ExecMarker].push(methodKey);
};

function* traverseCommandTree(ptr:any, predictionText:string){
  for(let ch in ptr){
    if (ch === ExecMarker){
      yield* ptr[ExecMarker].map(methodKey => ({predictionText, methodKey}));
    } else {
      yield* traverseCommandTree(ptr[ch], predictionText+ch);
    }
  }
}

function* suggestionsForInterface(interfaceKey:string, queryText:string):Generator<Types.Suggestion, void, void> {
  let ptr:any = MethodTreeByInterface[interfaceKey];
  if (!ptr){
    return;
  }
  // Crawl through the 'linked list over the text'
  for(let ch of queryText){
    if (!ptr[ch]){
      return;
    }
    ptr=ptr[ch];
  }

  yield* traverseCommandTree(ptr, '');
}

type PredictorGen = (Array<string>,string, {[string]:Types.Method})=>Generator<Types.Suggestion, void, void>;
export function* suggestGen(interfaceKeys:string[], queryText:string):Generator<Types.Suggestion, void, void> {

  for(let interfaceKey of interfaceKeys){
    yield* suggestionsForInterface(interfaceKey, queryText);
  }
}

type Predictor = (Array<string>,string, {[string]:Types.Method})=>Array<Types.Suggestion>;
export const suggest:Predictor = (context=[], queryText, allMethodsByKey) => {
  // context is an array of interface keys. These are the selected interfaces relevant for us.

  let suggestions = [];
  for(let interfaceKey of context){
    let ifaceSuggestions = [...suggestionsForInterface(interfaceKey, queryText)];

    if (ifaceSuggestions.length> 0){

      ifaceSuggestions.forEach(s => allMethodsByKey[s.methodKey].interfaceKey === interfaceKey);
      suggestions = suggestions.concat(ifaceSuggestions);
    }
  }

  return suggestions;
}
