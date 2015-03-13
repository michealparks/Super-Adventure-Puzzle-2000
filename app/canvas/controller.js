import GLOBAL from 'utils/global';
import Easing from 'utils/easing';


export const canvas = document.getElementById('canvas');
export const ctx    = canvas.getContext('2d');

const tileSize      = GLOBAL.tileSize;
const scaleFactor   = window.devicePixelRatio || 1;
const cacheCanvas   = document.createElement('canvas');
const cacheCtx      = cacheCanvas.getContext('2d');

GLOBAL.canvasHeight = canvas.height = window.innerHeight * scaleFactor;
GLOBAL.canvasWidth  = canvas.width  = window.innerWidth  * scaleFactor;

cacheCanvas.height = canvas.height;
cacheCanvas.width  = canvas.width;

let curZoom = 1;
let curTranslate = { x: 0, y: 0 };
let desiredZoom;
let velocity = { x: 0, y: 0 };

export function zoomToPoint(point, toSize, time, easingName) {
  desiredZoom = toSize;
  console.log(point.x, point.y)

  cacheCtx.drawImage(canvas, 0, 0);

  const easing = Easing[easingName];
  const center = { 
    x: Math.round(canvas.width/2), 
    y: Math.round(canvas.height/2) 
  };
  const distance = {
    x: -(center.x - (point.x*tileSize)),
    y: -(center.y - (point.y*tileSize))
  };
  let velocity = {
    x: distance.x / time,
    y: distance.y / time
  };
  let zoomSpeed = Math.abs(toSize - curZoom) / time;

  function frame() {
    if (curZoom >= desiredZoom) { curZoom = desiredZoom; return; }

    velocity.x = velocity.x;
    velocity.y = velocity.y;
    zoomSpeed  = zoomSpeed;

    curZoom += zoomSpeed;
    curTranslate.x += (velocity.x / curZoom);
    curTranslate.y += (velocity.y / curZoom);

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save();
    ctx.scale(curZoom, curZoom);
    ctx.translate(center.x + curTranslate.x, center.y + curTranslate.y);
    ctx.drawImage(cacheCanvas, -center.x, -center.y);
    ctx.restore();

    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
}
