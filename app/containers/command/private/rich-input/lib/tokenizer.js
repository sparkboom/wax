import * as Interpreter from '../../../../../modules';

type TokenType = 'TEXT' | 'COMMAND' | 'CARET' | 'SUGGESTION';

export type Token = {
  text:string,
  type:TokenType,
  isSelected:boolean,
}

const UNICODE_NARROW_NOBREAK_SPACE = '\u202F';
const UNICODE_OBJECT_REPLACEMENT_CHARACTER = '©'; // '\uFFFC';

/**
* Scans in character, by character through a string, yielding each one in turn.
* Information about its type is passed, and whether it is selected or not.
*
* A caret object is returned as well to help position it when the selection length is 0
*/
function* scanner(text, selectStart, selectEnd):Generator<Token,void,void>{
  for(let i=0; i<=text.length; i++){

    if (selectStart===selectEnd && i===selectStart){
      yield {
        text: '',
        type: 'CARET',
        isSelected:true};
    }

    if (i<text.length){
      let ch = text[i];
      ch = !(ch.match(/\s/))? ch:UNICODE_NARROW_NOBREAK_SPACE;
      yield {
        text:ch,
        type:ch===UNICODE_OBJECT_REPLACEMENT_CHARACTER? 'COMMAND':'TEXT',
        isSelected:i>=selectStart && i<selectEnd};
    }
  }
}

/**
* tokenizes styled items in the input field.
*
*/
export function* tokenize(text, tokens, selectStart, selectEnd){
  const currentCommandTokens = tokens.filter(t => t.type==='COMMAND');
  let token = null;
  for(let newScan of scanner(text, selectStart, selectEnd)){

    if(!token){
      token = newScan;
      continue;
    }

    if (token.type === newScan.type && token.isSelected === newScan.isSelected && token.type === 'TEXT' ){
      token.text += newScan.text;
      continue;
    }

    // if our current token is a command, yield it as it can only be 1 character.
    if (token.type === 'COMMAND'){
      let cmdToken = currentCommandTokens.shift();
      cmdToken.isSelected = token.isSelected;
      yield cmdToken;
      token = newScan;
      continue;
    }

    // if token change, in type or isSelected, then yield a token
    if (token.type !== newScan.type || token.isSelected !== newScan.isSelected){
      yield token;
      token = newScan;
      continue;
    }

    throw new Error(`Could not parse text '${text}' at ${i}, char ${ch}`);
  }
  yield token;
  return null;
}

export function* tokenizeWithSuggestion(tokens){

  let prevTokens = [null, null];
  for(let token of tokens){
    if (tokens && token.type==='TEXT'
          && prevTokens[1] && prevTokens[1].type==='CARET'
          && prevTokens[0] && prevTokens[0].type==='TEXT'){

      // if last 2 tokens was caret and text, and current is text,
      // we may be able to replace some forthcoming text with prediction
    }

    yield token;
    prevTokens.shift();
    prevTokens.push(token);
  }
  // if last 2 tokens was caret and text, then we're at the end of the
  if (prevTokens[1] && prevTokens[1].type==='CARET'
      && prevTokens[0] && prevTokens[0].type==='TEXT'){

    yield {
      type: 'SUGGESTION',
      text: '',
      isSelected:false,
      ...Interpreter.predict(prevTokens[0].text),
    };
  }
}
