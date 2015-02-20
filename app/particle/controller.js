import {Particle} from 'particle/model';

class Particles {
  constructor() {
    this.array = [];
    this.minRadius = 10;
    this.maxRadius = 30;
    this.count = 10;
    this.minSpeed = 60.0
    this.maxSpeed = 200.0;
    this.minScaleSpeed = 1.0;
    this.maxScaleSpeed = 4.0;
  }

  randomFloat(min, max) {
    return min + Math.random()*(max-min);
  }

  createExplosion(x, y, color) {
    for (let angle = 0, speed; angle < 360; angle += Math.round(360/this.count)) {
      speed = this.randomFloat(this.minSpeed, this.maxSpeed);
      this.array.push(new Particle(
        x, 
        y, 
        color,
        this.randomFloat(this.minRadius, this.maxRadius),
        this.randomFloat(this.minScaleSpeed, this.maxScaleSpeed),
        speed * Math.cos(angle * Math.PI / 180.0),
        speed * Math.sin(angle * Math.PI / 180.0)
      ));
    }
  }

  render(ctx) {
    // Reverse loop is necessary to prevent indexing issues
    // since array is spliced during the loop.
    let i = this.array.length;
    while (i-- > 0) {
      let p = this.array[i];
      if (p.update()) p.render(ctx);
      else            this.array.splice(i, 1);
    }
  }
}

export let particles = new Particles();
