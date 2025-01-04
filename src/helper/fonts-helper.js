import { fabric } from "fabric";

export default class FontHelper {

  createTextBox(selectedFont) {
    const textBox = new fabric.Textbox('My text', {
      fontSize: 100,
      left: 50,
      top: 50,
      fontFamily: selectedFont,
    });
  
    const gradient = this._getFontEffect(selectedFont);
  
    textBox.set('fill', gradient);
    return textBox;
  }
  
  _getFontEffect(fontName) {
    switch(fontName) {
      case 'Arial':
        return this._rainbowGradient();
      default:
        return null;
    }     
  }
  
  _rainbowGradient() {
    return new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
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
}

