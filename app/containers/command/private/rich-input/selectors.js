// @flow
import {createSelector} from 'reselect';

type Props = {
  value : string,
  caretIndex : number,
};

const UNICODE_NARROW_NOBREAK_SPACE : string = '\u202F';

const getValue = (props: Props) => props.value;
const getCaretIndex = (props : Props) => props.caretIndex;

export const getPreText : (props: Props) => string = createSelector(getValue, getCaretIndex, (value : string , caretIndex : number) : string => value.substr(0, caretIndex).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );
export const getPostText : (props: Props) => string = createSelector(getValue, getCaretIndex, (value : string, caretIndex : number) : string => value.substring(caretIndex, value.length).replace(/\s/g, UNICODE_NARROW_NOBREAK_SPACE) );
