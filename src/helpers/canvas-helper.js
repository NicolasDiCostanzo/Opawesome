import { fabric } from 'fabric';
import { CENTER_IMAGE_MAX_SIZE, CENTER_IMAGE_MIN_SIZE } from '../constants/constants';
import { createTextBox } from './fonts-helper';

/**
 * Calculate canvas dimensions according to the images aspect ratio and the min and max canvas size defined
 * @param {number} imgWidth
 * @param {number} imgHeight
 * @returns Size of the canvas
 */
function computeCanvasSize(imgWidth, imgHeight) {
  let canvasWidth;
  let canvasHeight;
  const aspectRatio = imgWidth / imgHeight;

  if (imgWidth > CENTER_IMAGE_MAX_SIZE || imgHeight > CENTER_IMAGE_MAX_SIZE) {
    if (aspectRatio > 1) {
      canvasWidth = CENTER_IMAGE_MAX_SIZE;
      canvasHeight = CENTER_IMAGE_MAX_SIZE / aspectRatio;
    } else {
      canvasHeight = CENTER_IMAGE_MAX_SIZE;
      canvasWidth = CENTER_IMAGE_MAX_SIZE * aspectRatio;
    }
  } else if (imgWidth < CENTER_IMAGE_MIN_SIZE || imgHeight < CENTER_IMAGE_MIN_SIZE) {
    if (aspectRatio > 1) {
      canvasWidth = CENTER_IMAGE_MIN_SIZE;
      canvasHeight = CENTER_IMAGE_MIN_SIZE / aspectRatio;
    } else {
      canvasHeight = CENTER_IMAGE_MIN_SIZE;
      canvasWidth = CENTER_IMAGE_MIN_SIZE * aspectRatio;
    }
  }
  return { canvasWidth, canvasHeight };
}

function applyImageOnCanvas(canvas, image) {
  canvas.clear();

  const imgWidth = image.width;
  const imgHeight = image.height;
  const { canvasWidth, canvasHeight } = computeCanvasSize(imgWidth, imgHeight);
  canvas.setWidth(canvasWidth);
  canvas.setHeight(canvasHeight);

  const scaleX = canvasWidth / imgWidth;
  const scaleY = canvasHeight / imgHeight;

  canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
    scaleX,
    scaleY,
  });
}

export function loadImageToCanvas(url, canvas) {
  fabric.Image.fromURL(url, (img) => {
    applyImageOnCanvas(canvas, img);
  }, { crossOrigin: 'anonymous' });
}

export function uploadCustomImage(canvas) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        applyImageOnCanvas(canvas, fabricImage);
      };
    };
    reader.readAsDataURL(file);
  };
}

export function addTextFieldOnCanvas(canvas, selectedFont) {
  const textBox = createTextBox(selectedFont);
  canvas.add(textBox);
  canvas.setActiveObject(textBox);
  canvas.renderAll();
}
