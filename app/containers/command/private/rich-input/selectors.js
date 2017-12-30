// @flow

import {createSelector} from 'reselect';
import type {Selection, CommandState} from '../../types';

type Props = CommandState;
type StringSelector = (props:Props) => string;

const UNICODE_NARROW_NOBREAK_SPACE:string = '\u202F';

// Make sure spaces are replaced with a nobreak space for better rendering
const replaceWs = str => str.replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE);

const getText = (props:Props) => props.text || '';
const getSelection = (props:Props) => props.selection;
const getKnownCommands = (props:Props) => props.knownCommands;

const getLowercaseText:StringSelector = createSelector(getText,(text:string) => text.toLowerCase());

export const getPreText:StringSelector = createSelector(getText, getSelection, (text:string , selection:Selection):string => replaceWs(text.substr(0, selection.start)) );
export const getSelectedText:StringSelector = createSelector(getText, getSelection, (text:string, selection:Selection):string => replaceWs(text.substr(selection.start, selection.length)) );
export const getPostText:StringSelector = createSelector(getText, getSelection, (text:string, selection:Selection):string => replaceWs(text.substr(selection.start + selection.length)) );

export const getPredictionText:StringSelector = createSelector(getLowercaseText, getKnownCommands, (lcaseText:string, knownCommands:Array<string>) => {
  if(lcaseText.length === 0){
    return '';
  }
  let prediction:string = knownCommands.find(cmd => cmd.startsWith(lcaseText)) || '';
  prediction = prediction.substr(lcaseText.length);
  return prediction.length===0? '':replaceWs(prediction);
});
