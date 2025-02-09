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

// #region Impact
const impactGradient = new fabric.Gradient({
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

const impactShadow = new fabric.Shadow({
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
export default {
  Arial: {
    fill: rainbowGradient,
  },
  Impact: {
    fill: impactGradient,
    shadow: impactShadow,
  },
  Blues: {
    fill: colors['dark-blue-retro'],
    shadow: retroBlueShadow,
    stroke: colors['light-blue-retro'],
    strokeWidth: 0.5,
  },
  'Retro Purple': {
    fill: gradientRetroPurple,
    shadow: retroPurpleShadow,
    style: 'italic',
  },
  'Pale Pink': {
    fill: palePinkGradient,
    shadow: palePinkShadow,
  },
  'Impact 2': {
    fontFamily: 'Impact',
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
  },
};
