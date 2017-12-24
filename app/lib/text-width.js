export function getWidthOfCanvasText(txt, fontname, fontsize){
    if(getWidthOfCanvasText.c === undefined){
        getWidthOfCanvasText.c=document.createElement('canvas');
        getWidthOfCanvasText.ctx=getWidthOfCanvasText.c.getContext('2d');
    }
    getWidthOfCanvasText.ctx.font = fontsize + ' ' + fontname;
    return getWidthOfCanvasText.ctx.measureText(txt).width;
}

export function getWidthOfSpanText(txt, fontname, fontsize){
  if(getWidthOfSpanText.e === undefined){
    getWidthOfSpanText.e = document.createElement('span');
    getWidthOfSpanText.e.style.display = "none";
    document.body.appendChild(getWidthOfSpanText.e);
  }
  getWidthOfSpanText.e.style.fontSize = fontsize;
  getWidthOfSpanText.e.style.fontFamily = fontname;
  getWidthOfSpanText.e.innerText = txt;
  return getWidthOfSpanText.e.offsetWidth;
}

export function getCharIndexFromX(txt, fontname, fontsize, x){
  let delta = Infinity;
  let i;
  for(i=0; i<= txt.length; i++){
    const str = txt.substr(0,i);
    const w = i===0? 0: getWidthOfSpanText(txt, fontname, fontsize);
    newDelta = Math.abs(w-x)
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
export function getNodeCharIndex({clientX, clientY}) {
  let textNode;
  let offset;
  let range
  if (document.caretPositionFromPoint) {

    range = document.caretPositionFromPoint(clientX, clientY);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {

    range = document.caretRangeFromPoint(clientX, clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  } else {

    console.error('Caret position not available in this browser');
  }

  return {
    textNode,
    offset,
    range,
  }
}
