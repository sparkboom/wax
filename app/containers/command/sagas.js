// @flow

import {takeEvery, put, select} from 'redux-saga/effects';

import * as ActionTypes from './action-types';
import * as AppActionTypes from '../app/action-types';
import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as AutoComplete from './lib/auto-complete';
import * as Tokenizer from './lib/tokenizer';
import {currentContext} from './selectors';

// Code

function* init(action):Generator<mixed, void, void>{

}

function* interpreter(keyPressAction:Actions.InputChange){

  const state = yield select();
  if (keyPressAction.keycode === null){

    const context = currentContext(state);
    const tokens = [...Tokenizer.tokenize(keyPressAction.text, state.command.tokens, keyPressAction.selectStart, keyPressAction.selectEnd)];
    const tokensWithSuggestion = [...Tokenizer.tokenizeWithSuggestion(context, tokens, state.command.methods)] ;
    const tokensAction = Actions.setTokens(tokensWithSuggestion);
    yield put(tokensAction);
  }else if (keyPressAction.keycode === 'esc'){

    const newTokens = [...Tokenizer.expandSelectCommandAndMergeTokens(state.command.tokens)];
    const tokensAction = Actions.setTokens(newTokens);
    yield put(tokensAction);
  }else if (keyPressAction.keycode === 'enter' && !!state.command.currentSuggestion){

    const method = state.command.methods[state.command.currentSuggestion.methodKey];
    const newTokens = [...Tokenizer.completeSuggestion(state.command.tokens, method)];
    const tokensAction = Actions.setTokens(newTokens);
    yield put(tokensAction);
  }else if (keyPressAction.keycode === 'enter'){

    const commands = [...Tokenizer.commandsPriorToCaret(state.command.tokens)];
    if (commands.length>0){
      const executeAction = AppActions.executeInstructions(commands);
      yield put(executeAction);
    }
  }
}

function* createObject(createObjectAction:Actions.CreateObject):Generator<mixed, void, void>{

  const {itemKey, name, parentItemKey} = createObjectAction;

  const state = yield select();
  // $FlowFixMe
  const parentInterface = state.command.interfaces[parentItemKey];
  AutoComplete.indexMethod(parentInterface, name, itemKey);
}

function* loadApi(action:Actions.LoadApi):Generator<mixed, void, void>{

  AutoComplete.loadApi(action.api);
}

export default function* commandSaga():Generator<void, void, void>{
  yield takeEvery(AppActionTypes.Init, init);
  yield takeEvery(ActionTypes.LoadApi, loadApi);
  yield takeEvery(ActionTypes.CreateObject, createObject);
  yield takeEvery(ActionTypes.InputChange, interpreter);
}
