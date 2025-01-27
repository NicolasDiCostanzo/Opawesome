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

function computedTextboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textbox) {
  const lastCanvasWidth = lastCanvasDimensions.width;
  const lastCanvasHeight = lastCanvasDimensions.height;
  const newCanvasWidth = textbox.canvas.width;
  const newCanvasHeight = textbox.canvas.height;

  const leftRatio = textbox.left / lastCanvasWidth;
  const topRatio = textbox.top / lastCanvasHeight;

  let newLeft = leftRatio * newCanvasWidth;
  let newTop = topRatio * newCanvasHeight;

  newLeft = Math.max(0, Math.min(newLeft, newCanvasWidth - textbox.width));
  newTop = Math.max(0, Math.min(newTop, newCanvasHeight - textbox.height));

  return { left: newLeft, top: newTop };
}

/**
 * Reposition textboxes on the canvas when the canvas size changes
 * @param {*} lastCanvasDimensions - The canvas before the size change
 * @param {*} newCanvas - The canvas after the size change
 */
function repositionTextBoxesOnCanvas(lastCanvasDimensions, newCanvas) {
  newCanvas.getObjects().forEach((object) => {
    if (object.type === 'textbox') {
      const textBox = object;
      const textBoxDistanceFromCanvasTopLeft = computedTextboxDistanceFromCanvasTopLeft(lastCanvasDimensions, textBox);
      object.set({
        left: textBoxDistanceFromCanvasTopLeft.left,
        top: textBoxDistanceFromCanvasTopLeft.top,
      });

      object.setCoords();
    }
  });

  newCanvas.renderAll();
}

function applyImageOnCanvas(lastCanvasDimensions, canvas, image) {
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

  if (lastCanvasDimensions) repositionTextBoxesOnCanvas(lastCanvasDimensions, canvas);
}

export function loadImageToCanvas(url, lastCanvasDimensions, canvas) {
  fabric.Image.fromURL(url, (img) => {
    applyImageOnCanvas(lastCanvasDimensions, canvas, img);
  }, { crossOrigin: 'anonymous' });

  canvas.renderAll();
}

export function uploadCustomImage(lastCanvasDimensions, canvas) {
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
        applyImageOnCanvas(lastCanvasDimensions, canvas, fabricImage);
      };
    };
    reader.readAsDataURL(file);
  };
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

// eslint-disable-next-line camelcase
export { computedTextboxDistanceFromCanvasTopLeft as _test_textboxDistanceFromCanvasTopLeft };
