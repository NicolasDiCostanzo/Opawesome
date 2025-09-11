import { ref, watch } from 'vue';
import { addTextFieldOnCanvas, deleteSelectedTextBoxFromCanvas } from '../helpers/canvas-helper';

export default function useLeftPartLogic(props, emit) {
  const selectedFont = ref(props.font);
  const hasSelectedTextBox = ref(false);

  watch(
    () => props.font,
    (newFont) => {
      selectedFont.value = newFont;
    },
  );

  // Watch for canvas changes and set up selection events
  watch(
    () => props.canvas,
    (newCanvas) => {
      if (newCanvas) {
        // Set up event listeners for selection changes
        const updateSelection = () => {
          const activeObject = newCanvas.getActiveObject();
          hasSelectedTextBox.value = activeObject && activeObject.type === 'textbox';
        };

        newCanvas.on('selection:created', updateSelection);
        newCanvas.on('selection:updated', updateSelection);
        newCanvas.on('selection:cleared', updateSelection);
        
        // Initial check
        updateSelection();
      }
    },
    { immediate: true },
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

  const deleteSelectedText = () => {
    if (!props.canvas) {
      throw new Error('Canvas is not defined');
    }
    deleteSelectedTextBoxFromCanvas(props.canvas);
  };

  return {
    selectedFont,
    hasSelectedTextBox,
    handleFontUpdate,
    addTextOnCanvas,
    deleteSelectedText,
  };
}
