export default class Particle {
  constructor(x, y, c, r, ss, vx, vy) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.radius = r;
    this.scaleSpeed = ss;
    this.velocityX = vx;
    this.velocityY = vy;
    this.scale = 1.0;
    this.frameDelay = 1000.0/60;
  }

  update() {
    if (this.scale === 0) return false;

    this.scale -= this.scaleSpeed * this.frameDelay / 1000.0;

    if (this.scale < 0) this.scale = 0;

    this.x += this.velocityX * this.frameDelay / 1000.0;
    this.y += this.velocityY * this.frameDelay / 1000.0;

    return true;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
