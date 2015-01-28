const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scaleFactor = window.devicePixelRatio || 1;

const canvasHeight = canvas.height = window.innerHeight * scaleFactor;
const canvasWidth  = canvas.width  = window.innerWidth  * scaleFactor;

export {canvas, ctx, scaleFactor};
