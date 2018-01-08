// @flow

import {CHANGE_TEXT, SET_SELECTION, CREATE_TOKEN, REMOVE_TOKENS, SET_TOKENS} from './action-types';
import type {ChangeTextAction, SetSelectionAction, CreateTokenAction, RemoveTokensAction, SetTokensAction} from './types';

export const textChange:(string => ChangeTextAction) = text => Object.freeze({type:CHANGE_TEXT, text});
export const selectionChange:((number, number) => SetSelectionAction) = (start, length) => Object.freeze({type:SET_SELECTION, start, length});
export const createToken:(any => CreateTokenAction) = ({command, action}) => Object.freeze({type:CREATE_TOKEN, command, action});
export const removeTokens:(?number[] => RemoveTokensAction) = tokenIndexes => Object.freeze({type:REMOVE_TOKENS, tokenIndexes});
export const setTokens:({}[] => SetTokensAction) = tokens => Object.freeze({type:SET_TOKENS, tokens});
