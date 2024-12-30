import {CENTER_IMAGE_MAX_SIZE, CENTER_IMAGE_MIN_SIZE} from "../constants/constants"
import { fabric } from 'fabric';

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
    return { canvasWidth, canvasHeight};
}

export function loadImageToCanvas(url, canvas) {
  canvas.clear();
  
  fabric.Image.fromURL(url, (img) => {
    const { canvasWidth, canvasHeight} = resizeCanvas(img.width, img.height)
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);


    const scaleX = canvasWidth / img.width;
    const scaleY = canvasHeight / img.height;
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX,
      scaleY
    });
  });
}

export function loadFontsAndAddTextbox(canvas) {
  canvas.clear();
  const urlMap = {
    VT323: 'url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2)',
    Pacifico: 'url(https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2)',
    Lato100: 'url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30AXC-qNiXg7Q.woff2)',
    Lato900: 'url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2)',
  };

  const fontVT323 = new FontFace('VT323', urlMap.VT323, {
    style: 'normal',
    weight: 'normal',
  });

  const fontPacifico = new FontFace('Pacifico', urlMap.Pacifico, {
    style: 'normal',
    weight: 'normal',
  });

  Promise.all([fontVT323.load(), fontPacifico.load()]).then(() => {
    document.fonts.add(fontVT323);
    document.fonts.add(fontPacifico);
    const vtTextBox = new fabric.Textbox('test ptn', {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 60,
      fontFamily: 'VT323',
      fill: 'black'
    });

    const pacificoTextBox = new fabric.Textbox('test ptn', {
      left: 50,
      top: 150,
      width: 200,
      fontSize: 60,
      fontFamily: 'Pacifico',
      fill: 'black'
    });

    canvas.add(vtTextBox, pacificoTextBox);
    canvas.renderAll();
  }).catch((error) => {
    console.error("Error loading font: ", error);
  });
}

export function addTextFieldOnCanvas(canvas, selectedFont) {
  console.log(selectedFont);
  const textBox = new fabric.Textbox('test ptn', {
    left: 50,
    top: 50,
    width: 200,
    fontSize: 60,
    fontFamily: selectedFont,
    fill: 'black'
  });

  canvas.add(textBox);
  canvas.renderAll();
}