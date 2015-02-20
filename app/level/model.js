import {subscribe, unsubscribe} from 'utils/mediator';

export class Level {
  constructor(config, events) {
    this.eventIterator = 0;
    this.currentEvent = null;
    this.events = events;
    this.gridData = config.gridData;
    this.colorKey = config.colorKey;

    this.currentLocationCriteria

    this.concludeEvent = this.concludeEvent.bind(this);
    this.testLocation = this.testLocation.bind(this);
  }

  startEvent() {
    this.currentEvent = this.events[this.eventIterator];

    switch (this.currentEvent.requirements.type) {
      case 'time':
        window.setTimeout(this.concludeEvent, this.currentEvent.requirements.criteria);
        break;
      case 'location': 
        this.currentLocationCriteria = this.currentEvent.requirements.criteria;
        subscribe('bip::location', this.testLocation);
        break;

      default:
        this.concludeEvent();
    }
  }

  testLocation(e) {
    if (e[0] === this.currentLocationCriteria[0] &&
        e[1] === this.currentLocationCriteria[1]) {
      this.concludeEvent();
      unsubscribe('bip::location', this.testLocation);
    }
  }

  concludeEvent() {
    this.currentEvent.execute(() => {
      if (this.events[++this.eventIterator]) {
        this.startEvent();
      }
    });
  }
}