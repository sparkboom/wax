// @flow
import {createSelector} from 'reselect';

type Selection = {
  start: number,
  length: number,
};

type Props = {
  text : string,
  selection : Selection
};

type StringSelector = (props: Props) => string;

const UNICODE_NARROW_NOBREAK_SPACE : string = '\u202F';

// Make sure spaces are replaced with a nobreak space for better rendering
const replaceWs = str => str.replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE);

const getText = (props: Props) => props.text || '';
const getSelection = (props : Props) => props.selection;

export const getPreText : StringSelector = createSelector(getText, getSelection, (text : string , selection : Selection) : string => replaceWs(text.substr(0, selection.start)) );
export const getSelectedText : StringSelector = createSelector(getText, getSelection, (text : string, selection : Selection) : string => replaceWs(text.substr(selection.start, selection.length)) );
export const getPostText : StringSelector = createSelector(getText, getSelection, (text : string, selection : Selection) : string => replaceWs(text.substr(selection.start + selection.length)) );
