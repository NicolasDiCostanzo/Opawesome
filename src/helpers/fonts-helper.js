import { fabric } from 'fabric';
import fontParameters from './font-parameters';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';

function resetTextFont(textBox) {
  textBox.set({
    fill: 'black',
    shadow: null,
    stroke: null,
    strokeWidth: 0,
  });
}

export function setTextFont(textBox, selectedFont) {
  resetTextFont(textBox);
  textBox.set('fontFamily', selectedFont);

  const params = fontParameters[selectedFont] || {};
  textBox.set('fontFamily', params.fontFamily);
  textBox.set('fill', params.fill || 'black');
  textBox.set('shadow', params.shadow || null);
  textBox.set('stroke', params.stroke || null);
  textBox.set('strokeWidth', params.strokeWidth || 0);
  textBox.set('fontStyle', params.style || 'normal');
}

export function createTextBox(selectedFont) {
  const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
    fontSize: 40,
    fontFamily: selectedFont,
  });

  setTextFont(textBox, selectedFont);

  return textBox;
}
