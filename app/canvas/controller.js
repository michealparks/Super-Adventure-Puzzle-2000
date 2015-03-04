import GLOBAL from 'utils/global'

export const canvas = document.getElementById('canvas');
export const ctx    = canvas.getContext('2d');

const scaleFactor   = window.devicePixelRatio || 1;
GLOBAL.canvasHeight = canvas.height = window.innerHeight * scaleFactor;
GLOBAL.canvasWidth  = canvas.width  = window.innerWidth  * scaleFactor;