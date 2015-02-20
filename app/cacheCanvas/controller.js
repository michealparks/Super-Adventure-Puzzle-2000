import {canvas} from 'canvas/controller';

export const cacheCanvas = document.createElement('canvas');
export const cacheCtx = cacheCanvas.getContext('2d');

cacheCanvas.height = canvas.height;
cacheCanvas.width  = canvas.width;
