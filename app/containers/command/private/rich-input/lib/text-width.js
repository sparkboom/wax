// @flow

// Types

type CaretPosition = {
  +offsetNode : HTMLElement,
  +offset : number,
  +getClientRect : any => mixed,
}

type Range = {
  +colapsed : boolean,
  +commonAncestorContainer : HTMLElement,
  +endContainer : HTMLElement,
  +endOffset : number,
  +startContainer : HTMLElement,
  +startOffset : number,
};

type ClientCoordinates = {
  clientX:number,
  clientY:number
};
type CharIndex = {
  textNode:HTMLElement,
  offset:number,
  range:mixed,
};

interface IFirefoxExperimentalDocument {
  caretPositionFromPoint(x : number, y : number) : ?CaretPosition
};

interface INonStandardDocument {
  caretRangeFromPoint(x : number, y : number) : ?Range
};

declare var document : Document & IFirefoxExperimentalDocument & INonStandardDocument;

// Code

let _canvas : ?HTMLCanvasElement = null;
let _ctx : ?CanvasRenderingContext2D  = null;
let _span : ?HTMLSpanElement = null;

export function getWidthOfCanvasText(txt : string, fontname : string, fontsize : string) : ?number{
  if(!_canvas && typeof document === Document){
    _canvas = (document.createElement('canvas') : HTMLCanvasElement);
    _ctx = _canvas.getContext('2d');
  }
  if (_ctx){
    _ctx.font = fontsize + ' ' + fontname;
    return _ctx.measureText(txt).width;
  }
  return null;
}

export function getWidthOfSpanText(txt : string, fontname : string, fontsize : string) : number{
  if(!_span){
    _span = document.createElement('span');
    _span.style.display = "none";
    document.body && document.body.appendChild(_span);
  }
  _span.style.fontSize = fontsize;
  _span.style.fontFamily = fontname;
  _span.innerText = txt;
  return _span.offsetWidth;
}

export function getCharIndexFromX(txt : string, fontname : string, fontsize : string, x: number) : number {
  let delta = Infinity;
  let i;
  for(i=0; i<= txt.length; i++){
    const str = txt.substr(0,i);
    const w = i===0? 0: getWidthOfSpanText(txt, fontname, fontsize);
    let newDelta : number = Math.abs(w-x)
    if (newDelta >= delta){
      break;
    }
    delta = newDelta;
  }
  return i;
}

/*
* Code borrowed from
* https://jsfiddle.net/api/mdn/
* https://developer.mozilla.org/en-US/docs/Web/API/document/caretPositionFromPoint#Browser_compatibility
*
* Warning - methods caretPositionFromPoint and caretRangeFromPoint are not fully supported on browsers, and alternative
* implementations may need to be considered if we are to use the browser as a platform.
*/
export function getNodeCharIndex({clientX, clientY}:ClientCoordinates):?CharIndex{
  let range: mixed;
  if (!!document.caretPositionFromPoint) {
    if (range = document.caretPositionFromPoint(clientX, clientY)){
      return {
        textNode : range.offsetNode,
        offset : range.offset,
        range
      };
    }
  }

  if (!!document.caretRangeFromPoint) {
    if (range = document.caretRangeFromPoint(clientX, clientY)){
      return {
        textNode : range.startContainer,
        offset : range.startOffset,
        range
      };
    }
  }

  console.error('Caret position not available in this browser');
  return null;
}
