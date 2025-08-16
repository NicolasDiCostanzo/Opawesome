import { ref, watch } from 'vue';
import { addTextFieldOnCanvas } from '../helpers/canvas-helper';

export default function useLeftPartLogic(props, emit) {
  const selectedFont = ref(props.font);

  watch(
    () => props.font,
    (newFont) => {
      selectedFont.value = newFont;
    },
  );

  function handleFontUpdate(fontName) {
    selectedFont.value = fontName;
    emit('update:font', fontName);
  }

  const addTextOnCanvas = () => {
    if (!props.canvas) {
      throw new Error('Canvas is not defined');
    }
    addTextFieldOnCanvas(props.canvas, selectedFont.value);
  };

  return {
    selectedFont,
    handleFontUpdate,
    addTextOnCanvas,
  };
}
