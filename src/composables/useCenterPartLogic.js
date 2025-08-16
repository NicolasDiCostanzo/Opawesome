import { fabric } from 'fabric';
import { ref, watch } from 'vue';
import { DOWNLOADED_FILE_NAME } from '../constants/labels';
import { deleteSelectedTextBoxFromCanvas, loadImageToCanvas, uploadCustomImage } from '../helpers/canvas-helper';
import { setTextFont } from '../helpers/fonts-helper';

export default function useCenterPartLogic(props, emit) {
  const canvas = ref(null);
  const selectedTextBox = ref(null);
  const lastCanvasDimensions = ref(null);

  const eventsToTriggerSelectedText = ['selection:created', 'selection:updated'];
  const selectionClearedEvent = 'before:selection:cleared';

  const initCanvas = (canvasId = 'canvas') => {
    canvas.value = new fabric.Canvas(canvasId);
    lastCanvasDimensions.value = { width: canvas.value.width, height: canvas.value.height };
    loadImageToCanvas(props.selectedImageUrl, null, canvas.value);
    emit('update:canvas', canvas.value);

    // Event handlers
    eventsToTriggerSelectedText.forEach((event) => {
      canvas.value.on(event, (e) => {
        [selectedTextBox.value] = e.selected;
        emit('update:font', selectedTextBox.value.fontName);
      });
    });

    canvas.value.on(selectionClearedEvent, () => {
      if (selectedTextBox.value?.text === null || selectedTextBox.value?.text === '') {
        deleteSelectedTextBoxFromCanvas(canvas.value);
      }
      selectedTextBox.value = null;
    });

    // Keyboard handler
    const handleKeydown = (e) => {
      const supprKeyPressed = e.key === 'Delete' && !e.ctrlKey;
      const textIsBeingEdited = selectedTextBox.value?.isEditing;

      if (supprKeyPressed && !textIsBeingEdited) {
        deleteSelectedTextBoxFromCanvas(canvas.value);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  };

  // Watchers
  watch(() => props.selectedImageUrl, (newUrl) => {
    if (!canvas.value) return;
    lastCanvasDimensions.value = { width: canvas.value.width, height: canvas.value.height };
    loadImageToCanvas(newUrl, lastCanvasDimensions.value, canvas.value);
  });

  watch(() => props.font, (newFont) => {
    if (!selectedTextBox.value || !canvas.value) return;
    setTextFont(selectedTextBox.value, newFont);
    canvas.value.renderAll();
  });

  const downloadCanvas = () => {
    if (!canvas.value) return;

    const format = 'jpeg';
    const dataURL = canvas.value.toDataURL({
      format,
      quality: 1,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${DOWNLOADED_FILE_NAME}.${format}`;
    link.click();
  };

  const uploadImage = () => {
    if (!canvas.value) return;
    uploadCustomImage(lastCanvasDimensions.value, canvas.value);
  };

  return {
    canvas,
    selectedTextBox,
    initCanvas,
    downloadCanvas,
    uploadImage,
  };
}
