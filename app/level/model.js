import GLOBAL                   from 'utils/global';
import {subscribe, unsubscribe} from 'utils/mediator';
import Util                     from 'utils/core';

import LevelTitle  from 'level-title/model'

export default class Level {
  constructor(config, events) {
    this.eventIterator = 0;
    this.openEvents = [];
    this.events = events;
    this.config = config;
    this.gridData = config.gridData;
    this.colorKey = config.colorKey;
    this.imageKey = config.imageKey;
  }

  startEvent() {
    let current = this.events[this.eventIterator];
    let done = () => {};

    if (! current) {
      return;
    }

    if (current.blocking) {
      done = this.concludeEvent.bind(this, this.eventIterator);
    } else {
      this.concludeEvent();
    }

    this.openEvents.push(new Event(current, done));
    console.log(this.openEvents)
  }

  concludeEvent(i = null) {
    i && Util.spliceArray(this.openEvents, i);
    if (this.events[++this.eventIterator]) {
      this.startEvent();
    }
  }

  build() {
    GLOBAL.canExit = this.config.canExit;
    
    if (this.config.levelName !== '') {
      const text = this.config.levelName
        .toLowerCase()
        .replace(/([^a-z]|^)([a-z])(?=[a-z]{2})/g, (_, g1, g2) => {
          return `${g1}<span>${g2.toUpperCase()}</span>`; 
        });
      LevelTitle.show(text);
    }
  }

  clean() {
    this.eventIterator = 0;
    this.openEvents.forEach((event) => {
      if (event.timeoutId) window.clearTimeout(event.timeoutId);
      if (event.subscribeId) unsubscribe(event.channel, event.subscribeId);
    })
    this.openEvents = [];
  }
}



class Event {
  constructor(config, done) {
    this.execute     = config.execute;
    this.done        = done;
    this.criteria    = config.requirements.criteria;
    this.subscribeId = null;
    this.channel     = null;
    this.timeoutId   = null

    switch(config.requirements.type) {
      case 'time':
        this.timeoutId = window.setTimeout(this.conclude.bind(this), this.criteria);
        break;
      case 'location':
        this.channel = 'Bip::location';
        this.subscribeId = subscribe(this.channel, this.testLocation.bind(this));
        break;
      default:
        this.conclude();
    }
  }

  testLocation(location) {
    if (location[0] == this.criteria[0] &&
        location[1] == this.criteria[1]) {
      unsubscribe('Bip::location', this.subscribeId);
      this.conclude();
    }
  }

  conclude() {
    this.execute(this.done );
    this.subscribeId = null;
    this.timeoutId = null;
  }
}
