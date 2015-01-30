import {Particle} from 'particle/model';

let particles = [];

function randomFloat (min, max) {
  return min + Math.random()*(max-min);
}

/*
* Advanced Explosion effect
* Each particle has a different size, move speed and scale speed.
*
* Parameters:
* 	x, y - explosion center
* 	color - particles' color
*/
function createExplosion (x, y, color) {
  let minSize = 10;
  let maxSize = 30;
  let count = 10;
  let minSpeed = 60.0;
  let maxSpeed = 200.0;
  let minScaleSpeed = 1.0;
  let maxScaleSpeed = 4.0;

  for (let angle = 0, particle; angle < 360; angle += Math.round(360/count)) {
    particle = new Particle();

    particle.x = x;
    particle.y = y;

    particle.radius = randomFloat(minSize, maxSize);

    particle.color = color;

    particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

    let speed = randomFloat(minSpeed, maxSpeed);

    particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
    particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

    particles.push(particle);
  }
}

function renderParticles () {
  let i = particles.length;
  while (i-- > 0) {
    let particle = particles[i];
    if (particle.update()) {
      particle.render();
    } else {
      particles.splice(i, 1);
    }
  }
}

export {createExplosion, renderParticles};
