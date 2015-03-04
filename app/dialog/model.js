import GLOBAL  from 'utils/global';
import Effects from 'sound/effects';
import {ptrup} from 'utils/device';

export default class Dialog {
  constructor(speed, dialog, done) {
    this.speed = speed;
    this.dialog = dialog;
    this.currentDialog = null;
    this.done = done;
    this.iterator = 0;
    this.div = document.createElement('div');
    console.log(GLOBAL.canvasWidth)
    this.div.style.width = window.innerWidth;
    this.div.className = 'dialog';
    this.div.innerHTML = `
      <div id="text"></div>
      <div id="next">></div>
      <div id="choice">
        <div id="yes">Yes</div>
        <div id="no">No</div>
      </div>`;
    this.textDiv = this.div.querySelector('#text');
    this.choiceDiv = this.div.querySelector('#choice');
    this.nextBtn = this.div.querySelector('#next');
    this.yesBtn = this.div.querySelector('#yes');
    this.noBtn = this.div.querySelector('#no');

    this.nextBtn.addEventListener(ptrup, this.onNext.bind(this));
    this.yesBtn.addEventListener(ptrup, this.onYesNo.bind(this, true)); 
    this.noBtn.addEventListener(ptrup, this.onYesNo.bind(this, false));

    document.body.appendChild(this.div);
    window.setTimeout(this.init.bind(this), 100);
  }

  init() {
    this.div.classList.add('active');
    this.onNext();
  }

  step() {
    this.currentDialog = this.dialog[this.iterator++];
    if (this.currentDialog !== undefined) {
      this.typeText(this.currentDialog.text);
    } else {
      return {done: true};
    }
    return {done: false};
  }

  remove() {
    this.div.classList.remove('active');
    window.setTimeout(() => {
      document.body.removeChild(this.div);
      this.done();
    }, 400);
  }

  typeText(text, done) {
    this.textDiv.innerHTML = '';
    this.nextBtn.classList.remove('active');
    this.choiceDiv.classList.remove('active');
    let i = 0, type = () => {
      if (i === text.length) {
        this.onTypeTextDone();
      } else {
        Effects.play('talk.wav');
        this.textDiv.innerHTML += text.charAt(i++);
        window.setTimeout(type, this.speed);
      }
    }
    type();
  }

  onTypeTextDone() {
    if (this.currentDialog.type === 'statement') {
      this.nextBtn.classList.add('active');
    } else {
      this.choiceDiv.classList.add('active');
    }
  }

  onNext() {
    if (this.step().done) {
      this.remove();
    }
  }

  onYesNo(agreed) {
    this.currentDialog.type = 'statement';
    this.typeText(this.currentDialog.response[agreed-0]);
  }

}