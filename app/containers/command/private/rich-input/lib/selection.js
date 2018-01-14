// @flow

// Types

export type SelectableInputElement = HTMLInputElement & SelectionAPI & TextAPI;

export interface TextAPI {
  createTextRange() : any;
}
export interface SelectionAPI {
  setSelectionRange(number, number) : void;
}

// Code

export function setCaretIndex(el:SelectableInputElement, caretIndex:number){
  if(!el) {
    return;
  }

  if(el.createTextRange) {
    var range = el.createTextRange();
    range.move('character', caretIndex);
    range.select();
  } else {
    el.focus();
    el.setSelectionRange && el.setSelectionRange(caretIndex, caretIndex);
  }
}
