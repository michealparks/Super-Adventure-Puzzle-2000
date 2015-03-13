import GLOBAL        from 'utils/global';
import {publish}     from 'utils/mediator';
import Effects       from 'sound/effects';
import {ptrup}       from 'utils/device';
import {zoomToPoint} from 'canvas/controller';

import Bips      from 'bip/controller';

const topDiv    = document.querySelector('#dialog');
const textDiv   = topDiv.firstChild;
const nextBtn   = topDiv.children[1];
const choiceDiv = topDiv.lastChild;

let speed = 50;
let done;
let iterator = 0;
let dialog;
let currentDialog;
let scaleFactor = 1;

choiceDiv.firstChild.addEventListener(ptrup, () => {
  currentDialog.type = 'statement';
  typeText(currentDialog.response[1]);
});

choiceDiv.lastChild.addEventListener(ptrup, () => {
  currentDialog.type = 'statement';
  typeText(currentDialog.response[0]);
});

export default function show(newDialog, callback) {
  dialog = newDialog;
  done = callback;
  iterator = 0;
  topDiv.classList.add('active');

  publish('GLOBAL::pause');
  zoomToPoint(
    /* coord */ Bips.array[0], 
    /* zoom */ 2, 
    /* time */ 20, 
    /* ease */ 'easeInOutQuart'
  );
  next();
}

function next() {
  if (step().done) {
    remove();
  }
}

function step() {
  currentDialog = dialog[iterator++];

  if (currentDialog === undefined) return { done: true };

  typeText(currentDialog.text);
  return { done: false };
}

function typeText(text, done) {
  textDiv.innerHTML = '';
  nextBtn.classList.remove('active');
  choiceDiv.classList.remove('active');

  let i = 0;

  function typeLetter() {
    if (i == text.length) {
      return onTypeTextDone();
    }

    Effects.play('talk.wav');
    textDiv.innerHTML += text.charAt(i++);
    window.setTimeout(typeLetter, speed);
  }

  typeLetter();
}

function onTypeTextDone() {
  if (currentDialog.type === 'statement') {
    nextBtn.classList.add('active');
  } else {
    choiceDiv.classList.add('active');
  }
}

function remove() {
  topDiv.classList.remove('active');

  publish('GLOBAL::resume');
  done();
}