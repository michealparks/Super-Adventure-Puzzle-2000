export const hasTouch = window.ontouchstart !== undefined;
export const hasPointer = navigator.pointerEnabled !== undefined || navigator.msPointerEnabled !== undefined;

export const ptrdown = hasPointer? 'pointerdown': hasTouch? 'touchstart': 'mousedown';
export const ptrup = hasPointer? 'pointermove': hasTouch? 'touchmove': 'mousemove';
export const ptrmove = hasPointer? 'pointerup': hasTouch? 'touchend': 'mouseup';
