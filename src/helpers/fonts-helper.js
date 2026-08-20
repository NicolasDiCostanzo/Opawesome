import { fabric } from 'fabric';
import { defaultFontSize } from '../constants/constants';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';
import fontParameters from './font-parameters';

const WORD_GAP_WIDTH_FACTOR = 0.2;

function widenSpaceGraphemes(textBox) {
  const original = fabric.Text.prototype._getGraphemeBox;
  const extraWidth = textBox.fontSize * WORD_GAP_WIDTH_FACTOR;
  textBox.set('_getGraphemeBox', function widenedGetGraphemeBox(grapheme, lineIndex, charIndex, prevGrapheme, skipLeft) {
    const box = original.call(this, grapheme, lineIndex, charIndex, prevGrapheme, skipLeft);
    if (grapheme === ' ') {
      box.width += extraWidth;
      box.kernedWidth += extraWidth;
    }
    return box;
  });
}

function measureSingleLineWidth(text, fontFamily, fontSize) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text.replace(/\n/g, ' ')).width;
}

function refreshWavyLayout(textBox, params) {
  const singleLineText = textBox.text.replace(/\n/g, ' ');
  const measuredWidth = measureSingleLineWidth(singleLineText, textBox.fontFamily, textBox.fontSize);
  const spaceCount = (singleLineText.match(/ /g) || []).length;
  const extraWidth = spaceCount * textBox.fontSize * WORD_GAP_WIDTH_FACTOR;
  const width = measuredWidth + extraWidth + textBox.fontSize;
  textBox.set({
    path: params.buildPath(textBox.fontSize, width),
    width,
  });
}

function resetTextFont(textBox) {
  if (textBox.wavyResizeHandler) {
    textBox.off('changed', textBox.wavyResizeHandler);
    textBox.set('wavyResizeHandler', null);
  }
  textBox.set('_getGraphemeBox', fabric.Text.prototype._getGraphemeBox);
  textBox.set({
    fill: 'black',
    shadow: null,
    stroke: null,
    strokeWidth: 0,
    path: null,
    textAlign: 'left',
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

  if (params.buildPath) {
    widenSpaceGraphemes(textBox);
    textBox.set('textAlign', 'center');
    refreshWavyLayout(textBox, params);
    const resizeHandler = () => refreshWavyLayout(textBox, params);
    textBox.set('wavyResizeHandler', resizeHandler);
    textBox.on('changed', resizeHandler);
  }
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
