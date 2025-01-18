import { fabric } from 'fabric';
import { CENTER_IMAGE_MAX_SIZE, CENTER_IMAGE_MIN_SIZE } from '../constants/constants';
import { createTextBox } from './fonts-helper';

/**
 * Calculate canvas dimensions according to the images aspect ratio and the min and max canvas size defined
 * @param {number} imgWidth
 * @param {number} imgHeight
 * @returns Size of the canvas
 */
export function resizeCanvas(imgWidth, imgHeight) {
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

export function loadImageToCanvas(url, canvas) {
  canvas.clear();

  fabric.Image.fromURL(url, (img) => {
    const { canvasWidth, canvasHeight } = resizeCanvas(img.width, img.height);
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    const scaleX = canvasWidth / img.width;
    const scaleY = canvasHeight / img.height;

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX,
      scaleY,
    });
  }, { crossOrigin: 'anonymous' });
}

export function addTextFieldOnCanvas(canvas, selectedFont) {
  const textBox = createTextBox(selectedFont);
  canvas.add(textBox);
  textBox.centerH();
  textBox.centerV();
  canvas.setActiveObject(textBox);
  canvas.renderAll();
}

export function deleteSelectedTextBoxFromCanvas(canvas) {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'textbox') {
    canvas.remove(activeObject);
  }
}
