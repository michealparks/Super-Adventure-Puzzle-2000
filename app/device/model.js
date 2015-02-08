const hasTouch = window.ontouchstart !== undefined;

let ptrdown;
let ptrup;
let ptrmove;

if (navigator.pointerEnabled || navigator.msPointerEnabled) {
  ptrdown = 'pointerdown';
  ptrup = 'pointerup';
  ptrmove = 'pointermove';
} else if (hasTouch) {
  ptrdown = 'touchstart';
  ptrup = 'touchend';
  ptrmove = 'touchmove';
} else {
  ptrdown = 'mousedown';
  ptrup = 'mouseup';
  ptrmove = 'mousemove';
}

export {hasTouch, ptrdown, ptrup, ptrmove};
