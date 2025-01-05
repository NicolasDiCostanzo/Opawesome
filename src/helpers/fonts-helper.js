import { fabric } from 'fabric';
import colors from '../constants/colors';
import { DEFAULT_TEXTBOX_TEXT } from '../constants/labels';

export default class FontHeloper {
  setTextFont(textBox, selectedFont) {
    textBox.set('fontFamily', selectedFont);
    const gradient = this._getFontEffect(selectedFont);
    if (gradient) {
      textBox.set('fill', gradient);
    } else {
      textBox.set('fill', 'black');
    }

    const shadow = this._getShadowEffect(selectedFont);
    if (shadow) {
      textBox.set('shadow', shadow);
    } else {
      textBox.set('shadow', null);
    }

    if (selectedFont === 'Impact') {
      textBox.rotate(-15);
    } else {
      textBox.rotate(0);
    }
  }

  createTextBox(selectedFont) {
    const textBox = new fabric.Textbox(DEFAULT_TEXTBOX_TEXT, {
      fontSize: 100,
      left: 50,
      top: 50,
      fontFamily: selectedFont,
    });

    this.setTextFont(textBox, selectedFont);

    return textBox;
  }

  _getFontEffect(fontName) {
    switch (fontName) {
      case 'Arial':
        return this._rainbowGradient();
      case 'Impact':
        return this._impactGradient();
      default:
        return null;
    }
  }

  _rainbowGradient() {
    return new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0,
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

  _impactGradient() {
    return new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      colorStops: [
        { offset: 0, color: colors['superhero-yellow'] },
        { offset: 1, color: colors['superhero-orange'] },
      ],
    });
  }

  _getShadowEffect(fontName) {
    switch (fontName) {
      case 'Impact':
        return this._3dEffect();
      default:
        return null;
    }
  }

  _3dEffect() {
    return new fabric.Shadow({
      color: colors['superhero-shadow'],
      offsetX: 8,
      offsetY: 8,
      affectStroke: true,
    });
  }
}
