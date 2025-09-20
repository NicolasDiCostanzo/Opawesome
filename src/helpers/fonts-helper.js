import { fabric } from 'fabric';
import { defaultFontSize } from '../constants/constants';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';
import fontParameters from './font-parameters';

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

  const params = fontParameters[selectedFont];
  textBox.set('fontFamily', params.fontFamily);
  textBox.set('fill', params.fill || 'black');
  textBox.set('shadow', params.shadow || null);
  textBox.set('stroke', params.stroke || null);
  textBox.set('strokeWidth', params.strokeWidth || 0);
  textBox.set('fontStyle', params.style || 'normal');
  textBox.set('fontName', params.fontName);
}

export function createTextBox(selectedFont) {
  const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
    fontSize: defaultFontSize(),
    width: 300,
  });

  setTextFont(textBox, selectedFont);

  return textBox;
}

export function loadCustomFonts() {
  const fonts = [
    {
      name: 'Arial',
      url: 'url(https://fonts.cdnfonts.com/s/29105/ARIAL.woff)',
    },
    {
      name: 'Impact',
      url: 'url(https://fonts.cdnfonts.com/s/87898/impact.woff)',
    },
    {
      name: 'Comic sans ms',
      url: 'url(https://db.onlinewebfonts.com/t/7cc6719bd5f0310be3150ba33418e72e.woff)',
    },
    {
      name: 'Times New Roman',
      url: 'url(https://fonts.cdnfonts.com/s/57197/times.woff)',
    },
  ];

  fonts.forEach((font) => {
    const fontFace = new FontFace(font.name, font.url, {
      style: 'normal',
      weight: 'normal',
    });
    fontFace.load().then(() => {
      document.fonts.add(fontFace);
    }).catch(() => {
      // eslint-disable-next-line no-console
      console.error(`Failed to load font: ${font.name} from ${font.url}`);
    });
  });
}
