import {GLOBAL} from 'utils/global';
import {hasTouch, ptrdown, ptrmove, ptrup} from 'utils/device';

import {bips} from 'bip/controller';

class UserInput {
  constructor() {
    this.ptrDownX = 0;
    this.ptrDownY = 0;

    window.addEventListener('keyup', (e) => {
      if (GLOBAL.isInGame) this.onInGameKeyUp(e);
      else                 this.onOutGameKeyUp(e);
    });

    // TODO - perhaps get rid of
    if (! hasTouch) return;

    window.addEventListener(ptrdown, (e) => {
      if (GLOBAL.isInGame) this.onInGamePtrDown(e);
    });

    window.addEventListener(ptrmove, (e) => {
      this.onPtrMove(e);
    });

    window.addEventListener(ptrup, (e) => {
      if (GLOBAL.isInGame) this.onInGamePtrUp(e);
    })
  }

  onInGameKeyUp(e) {
    const bip = bips.current;
    bip.stopMovement();
    bip.direction = [(e.keyCode-38)%2, (e.keyCode-39)%2];
    bip.makeMovement();
  }

  onOutGameKeyUp(e) {

  }

  onInGamePtrDown(e) {
    this.ptrDownX = e.touches[0].pageX;
    this.ptrDownY = e.touches[0].pageY;
  }

  onPtrMove(e) {
    e.preventDefault();
  }

  onInGamePtrUp(e) {
    const bip = bips.current;
    const touch = e.changedTouches[0];
    const swipeDeltaX = touch.pageX - this.ptrDownX;
    const swipeDeltaY = touch.pageY - this.ptrDownY;

    if (Math.abs(swipeDeltaX) > 10 || Math.abs(swipeDeltaY) > 10) {
      bip.setMovement(0, 0);
      bip.stopMovement();
      if (Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY)) {
        bip.setMovement(swipeDeltaX > 0 ? 1 : -1, 0);
      } else {
        bip.setMovement(0, swipeDeltaY < 0 ? -1 : 1);
      }
      bip.makeMovement();
    }
  }
}

export let userInput = new UserInput();