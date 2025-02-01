import { fabric } from 'fabric';
import colors from '../constants/colors';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';

function createRainbowGradient() {
  return new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'percentage',
    coords: {
      x1: 0, y1: 0, x2: 1, y2: 0,
    },
    colorStops: [
      { offset: 0, color: 'red' },
      { offset: 0.2, color: 'orange' },
      { offset: 0.4, color: 'yellow' },
      { offset: 0.6, color: 'green' },
      { offset: 0.8, color: 'blue' },
      { offset: 1, color: 'purple' },
    ],
  });
}

function createImpactGradient() {
  return new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'percentage',
    coords: {
      x1: 0, y1: 0, x2: 0, y2: 1,
    },
    colorStops: [
      { offset: 0, color: colors['superhero-yellow'] },
      { offset: 1, color: colors['superhero-orange'] },
    ],
  });
}

function createRetroText(textContent) {
  return new fabric.Text(textContent, {
    fontSize: 40,
    fontFamily: 'Arial',
    fill: colors['dark-blue-retro'],
    stroke: colors['light-blue-retro'],
    strokeWidth: 0.5,
  });
}

function create3DEffect() {
  return new fabric.Shadow({
    color: colors['superhero-shadow'],
    offsetX: 8,
    offsetY: 8,
  });
}

function createRetroShadow() {
  return new fabric.Shadow({
    color: colors['red-retro'],
    offsetX: 2,
    offsetY: 2,
  });
}

const GRADIENTS = {
  Arial: createRainbowGradient,
  Impact: createImpactGradient,
};

const SHADOWS = {
  Impact: create3DEffect,
  Blues: createRetroShadow,
};

const RETRO = {
  Blues: createRetroText,
};

export function setTextFont(textBox, selectedFont) {
  textBox.set('fontFamily', selectedFont);
  const gradient = GRADIENTS[selectedFont] ? GRADIENTS[selectedFont]() : 'black';
  textBox.set('fill', gradient);

  const shadow = SHADOWS[selectedFont] ? SHADOWS[selectedFont]() : null;
  textBox.set('shadow', shadow);

  if (RETRO[selectedFont]) {
    const retroText = RETRO[selectedFont](textBox.text, textBox.fontSize);
    textBox.set({
      stroke: retroText.stroke,
      strokeWidth: retroText.strokeWidth,
      fill: retroText.fill,
    });
  } else {
    textBox.set({
      stroke: null,
      strokeWidth: 0,
      fontWeight: 'normal',
    });
  }
}

export function createTextBox(selectedFont) {
  const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
    fontSize: 40,
    fontFamily: selectedFont,
  });

  setTextFont(textBox, selectedFont);

  return textBox;
}
