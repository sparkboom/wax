// @flow
import * as Interpreter from '../../../../modules';
import {createSelector} from 'reselect';
import type {Selection} from '../../types';
import type {Props} from './types';

// Types
type Selector<X> = Props=>X;

// Code
const UNICODE_NARROW_NOBREAK_SPACE = '\u202F';

// Make sure spaces are replaced with a nobreak space for better rendering
const replaceWs = str => str.replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE);

const getText:Selector<string> = props => props.text || '';
const getSelection:Selector<Selection> = props => props.selection;
const getLowercaseText:Selector<string> = createSelector(getText,text => text.toLowerCase());
export const getPreText:Selector<string> = createSelector(getText, getSelection, (text, selection) => replaceWs(text.substr(0, selection.start)) );
export const getSelectedText:Selector<string> = createSelector(getText, getSelection, (text, selection) => replaceWs(text.substr(selection.start, selection.length)) );
export const getPostText:Selector<string> = createSelector(getText, getSelection, (text, selection) => replaceWs(text.substr(selection.start + selection.length)) );
export const interpret:Selector<Interpreter.Suggestion> = createSelector(getText,text => Interpreter.predict(text));
