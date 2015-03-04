import {subscribe, unsubscribe} from 'utils/mediator';
import Util                     from 'utils/core';

export class Level {
  constructor(config, events) {
    this.eventIterator = 0;
    this.openEvents = [];
    this.events = events;
    this.gridData = config.gridData;
    this.colorKey = config.colorKey;
  }

  startEvent() {
    let current = this.events[this.eventIterator];
    let done = () => {};

    if (current.blocking) {
      done = this.concludeEvent.bind(this, this.eventIterator);
    } else if (this.events[++this.eventIterator]) {
      this.startEvent();
    }

    this.openEvents.push(new Event(current, done));
  }

  concludeEvent(i) {
    Util.spliceArray(this.openEvents, i);
    if (this.events[++this.eventIterator]) {
      this.startEvent();
    }
  }
}

class Event {
  constructor(config, done) {
    this.execute = config.execute;
    this.done = done;
    this.criteria = config.requirements.criteria;
    this.id = null;

    switch(config.requirements.type) {
      case 'time':
        window.setTimeout(this.conclude.bind(this), this.criteria);
        break;
      case 'location':
        this.id = subscribe('bip::location', this.testLocation.bind(this));
        break;
      default:
        this.conclude();
    }
  }

  testLocation(location) {
    if (location[0] == this.criteria[0] &&
        location[1] == this.criteria[1]) {
      this.conclude();
      unsubscribe('bip::location', this.id);
    }
  }

  conclude() {
    console.log(this.done)
    this.execute(this.done);
  }
}
