import { fabric } from 'fabric';
import colors from '../constants/colors';

// #region Arial
const rainbowGradient = new fabric.Gradient({
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
// #endregion

// #region superhero
const superheroGradient = new fabric.Gradient({
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

const superheroShadow = new fabric.Shadow({
  color: colors['superhero-shadow'],
  offsetX: 8,
  offsetY: 8,
});
// #endregion

// #region Blues
const retroBlueShadow = new fabric.Shadow({
  color: colors['blue-retro-shadow'],
  offsetX: 2,
  offsetY: 2,
});
// #endregion

// #region Retro purple
const gradientRetroPurple = new fabric.Gradient({
  type: 'linear',
  gradientUnits: 'percentage',
  coords: {
    x1: 0, y1: 0, x2: 0, y2: 1,
  },
  colorStops: [
    { offset: 0, color: colors['purple-retro-light'] },
    { offset: 1, color: colors['purple-retro-dark'] },
  ],
});

const retroPurpleShadow = new fabric.Shadow({
  color: colors['purple-retro-shadow'],
  offsetX: 2,
  offsetY: 2,
});
// #endregion

// #region Pale pink
const palePinkGradient = new fabric.Gradient({
  type: 'linear',
  gradientUnits: 'percentage',
  coords: {
    x1: 0, y1: 0, x2: 0, y2: 1,
  },
  colorStops: [
    { offset: 0, color: colors['pale-pink-light'] },
    { offset: 1, color: colors['pale-pink-dark'] },
  ],
});

const palePinkShadow = new fabric.Shadow({
  color: colors['pale-pink-shadow'],
  offsetX: -1.75,
  offsetY: -1.75,
});
// #endregion

// #region Tusker Grotesk
const tuskerGrosteskShadow = new fabric.Shadow({
  color: colors['tusker-dark-blue'],
  offsetX: 3,
  offsetY: -2,
});

export const createWavyText = (text, options) => {
  const waveAmplitude = options.waveAmplitude || 10;
  const waveFrequency = options.waveFrequency || 0.1;

  const textObjects = text?.split('').map((char, index) => {
    const textObj = new fabric.Text(char, {
      left: index * (options.fontSize || 30) * 0.6, // Adjust spacing based on font size
      top: 100,
      fontFamily: options.fontFamily || 'Arial',
      fontSize: options.fontSize || 30,
      fill: options.fill || 'black',
    });

    // Apply wave transformation
    textObj.set({
      top: textObj.top + Math.sin(index * waveFrequency) * waveAmplitude,
    });

    return textObj;
  });

  return new fabric.Group(textObjects, {
    selectable: true,
  });
};
// #endregion

export const fontParameters = {
  Arial: {
    fontFamily: 'Arial',
    fill: rainbowGradient,
    weight: 'bold',
  },
  'Comic sans ms': {
    fontFamily: 'Comic sans ms',
  },
  'Super Hero': {
    fontFamily: 'Impact',
    fill: superheroGradient,
    shadow: superheroShadow,
  },
  Blues: {
    fontFamily: 'Times New Roman',
    fill: colors['dark-blue-retro'],
    shadow: retroBlueShadow,
    stroke: colors['light-blue-retro'],
    strokeWidth: 0.5,
  },
  'Retro Purple': {
    fontFamily: 'Times New Roman',
    fill: gradientRetroPurple,
    shadow: retroPurpleShadow,
    style: 'italic',
  },
  'Pale Pink': {
    fontFamily: 'Times New Roman',
    fill: palePinkGradient,
    shadow: palePinkShadow,
  },
  Impact: {
    fontFamily: 'Impact',
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
  },
  'Tusker Grotesk': {
    fontFamily: 'Tusker Grotesk',
    fill: colors['tusker-blue'],
    shadow: tuskerGrosteskShadow,
    hasWavyEffect: true,
  },
};

// export default fontParameters;
