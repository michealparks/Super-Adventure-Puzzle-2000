const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scaleFactor = window.devicePixelRatio || 1;

canvas.height = window.innerHeight * scaleFactor;
canvas.width = window.innerWidth * scaleFactor;

export {canvas, ctx, scaleFactor};