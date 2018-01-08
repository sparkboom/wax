// @flow

import {SET_TOKENS, FILTER_TOKENS} from './action-types';
import type {SetTokensAction, FilterTokensAction} from './types';

export const setTokens:({}[] => SetTokensAction) = tokens => Object.freeze({type:SET_TOKENS, tokens});
export const filterTokens:({}[] => FilterTokensAction) = match => Object.freeze({type:FILTER_TOKENS, match});
