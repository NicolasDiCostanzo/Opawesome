import { fabric } from 'fabric';
import { canvasMaxSize, canvasMinSize } from '../constants/constants';
import { createTextBox } from './fonts-helper';

/**
 * Calculate canvas dimensions according to the images aspect ratio and the min and max canvas size defined
 * @param {number} imgWidth
 * @param {number} imgHeight
 * @returns Size of the canvas
 */
function computeCanvasSize(imgWidth, imgHeight) {
  let canvasWidth = imgWidth;
  let canvasHeight = imgHeight;
  const aspectRatio = imgWidth / imgHeight;

  const minSize = canvasMinSize();
  const maxSize = canvasMaxSize();

  if (imgWidth > maxSize || imgHeight > maxSize) {
    if (aspectRatio > 1) {
      canvasWidth = maxSize;
      canvasHeight = maxSize / aspectRatio;
    } else {
      canvasHeight = maxSize;
      canvasWidth = maxSize * aspectRatio;
    }
  } else if (imgWidth < minSize || imgHeight < minSize) {
    if (aspectRatio > 1) {
      canvasWidth = minSize;
      canvasHeight = minSize / aspectRatio;
    } else {
      canvasHeight = minSize;
      canvasWidth = minSize * aspectRatio;
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

export function loadImageToCanvas(url, lastCanvasDimensions, canvas, callback) {
  fabric.Image.fromURL(url, (img) => {
    applyImageOnCanvas(lastCanvasDimensions, canvas, img);
    if (callback) callback();
  }, { crossOrigin: 'anonymous' });
}

export function uploadCustomImage(lastCanvasDimensions, canvas, callback) {
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
        if (callback) callback();
      };
    };
    reader.readAsDataURL(file);
  };
}

export async function addTextFieldOnCanvas(canvas, selectedFont) {
  const textBox = await createTextBox(selectedFont);
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
