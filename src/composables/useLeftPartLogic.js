import { ref, watch, computed } from 'vue';
import { addTextFieldOnCanvas, deleteSelectedTextBoxFromCanvas } from '../helpers/canvas-helper';

export default function useLeftPartLogic(props, emit) {
  const selectedFont = ref(props.font);
  const hasSelectedTextBox = ref(false);
  const hasFontSelected = computed(() => selectedFont.value !== null);

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
          
          if (!activeObject) {
            hasSelectedTextBox.value = false;
          } else if (activeObject.type === 'textbox') {
            hasSelectedTextBox.value = true;
          } else if (activeObject.type === 'activeSelection') {
            const selectedObjects = activeObject.getObjects();
            hasSelectedTextBox.value = selectedObjects.some((obj) => obj.type === 'textbox');
          } else {
            hasSelectedTextBox.value = false;
          }
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
    if (!selectedFont.value) {
      throw new Error('No font selected');
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
    hasFontSelected,
    handleFontUpdate,
    addTextOnCanvas,
    deleteSelectedText,
  };
}
