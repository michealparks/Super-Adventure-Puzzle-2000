import {ctx} from 'canvas/controller';
import {levels} from 'grid/model';
import {hasTouch, ptrdown, ptrup} from 'device/model';
import {Bip} from 'bip/model';

var ptrDownX;
var ptrDownY;

window.addEventListener('keyup', onKeyUp);

if (hasTouch) {
  window.addEventListener(ptrdown, onPtrDown);
  window.addEventListener(ptrup, onPtrUp);
}

function onPtrDown (e) {
  ptrDownX = e.touches[0].pageX;
  ptrDownY = e.touches[0].pageY;
}

function onPtrUp (e) {
  const bip = Bip.getCurBip();
  const touch = e.changedTouches[0];
  const swipeDeltaX = touch.pageX - ptrDownX;
  const swipeDeltaY = touch.pageY - ptrDownY;

  if (Math.abs(swipeDeltaX) > 10 || Math.abs(swipeDeltaY) > 10) {
    bip.setMovement(0, 0);
    bip.stopMovement();
    if (Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY)) {
      bip.setMovement(swipeDeltaX > 0 ? 1 : -1, 0);
    } else {
      bip.setMovement(0, swipeDeltaY > 0 ? -1 : 1);
    }
    bip.makeMovement();
  }
}

function onKeyUp (e) {
  const bip = Bip.getCurBip();

  bip.stopMovement();
  bip.setMovement((e.keyCode-38)%2, (e.keyCode-39)%2);
  bip.makeMovement();
}
