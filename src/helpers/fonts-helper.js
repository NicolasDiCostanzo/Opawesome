import { fabric } from 'fabric';
import { defaultFontSize } from '../constants/constants';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';
import fontParameters from './font-parameters';

async function ensureCustomFontsLoaded() {
  try {
    await document.fonts.load('16px "Tusker Grotesk"');
  } catch (error) {
    console.error('Error loading custom fonts:', error);
  }
}

function resetTextFont(textBox) {
  textBox.set({
    fill: 'black',
    shadow: null,
    stroke: null,
    strokeWidth: 0,
  });
}

export async function setTextFont(textBox, selectedFont) {
  const params = fontParameters[selectedFont];

  if (params.fontFamily === 'Tusker Grotesk') {
    await ensureCustomFontsLoaded();
  }

  resetTextFont(textBox);
  textBox.set('fontFamily', params.fontFamily);
  textBox.set('fill', params.fill || 'black');
  textBox.set('shadow', params.shadow || null);
  textBox.set('stroke', params.stroke || null);
  textBox.set('strokeWidth', params.strokeWidth || 0);
  textBox.set('fontStyle', params.style || 'normal');
  textBox.set('fontName', params.fontName);
}

export async function createTextBox(selectedFont) {
  const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
    fontSize: defaultFontSize(),
  });

  await setTextFont(textBox, selectedFont);

  return textBox;
}
