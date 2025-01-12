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

function create3DEffect() {
  return new fabric.Shadow({
    color: colors['superhero-shadow'],
    offsetX: 8,
    offsetY: 8,
    affectStroke: true,
  });
}

const GRADIENTS = {
  Arial: createRainbowGradient,
  Impact: createImpactGradient,
};

const SHADOWS = {
  Impact: create3DEffect,
};

export function setTextFont(textBox, selectedFont) {
  textBox.set('fontFamily', selectedFont);
  const gradient = GRADIENTS[selectedFont] ? GRADIENTS[selectedFont]() : 'black';
  textBox.set('fill', gradient);

  const shadow = SHADOWS[selectedFont] ? SHADOWS[selectedFont]() : null;
  textBox.set('shadow', shadow);
}

export function createTextBox(selectedFont) {
  const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
    fontSize: 40,
    fontFamily: selectedFont,
  });

  setTextFont(textBox, selectedFont);

  return textBox;
}
