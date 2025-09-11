import { fabric } from 'fabric';
import { ref, watch } from 'vue';
import { DOWNLOADED_FILE_NAME } from '../constants/labels';
import { deleteSelectedTextBoxFromCanvas, loadImageToCanvas, uploadCustomImage } from '../helpers/canvas-helper';
import { setTextFont, loadCustomFonts } from '../helpers/fonts-helper';

export default function useCenterPartLogic(props, emit) {
  let canvas;
  const selectedTextBox = ref(null);
  const lastCanvasDimensions = ref(null);

  const eventsToTriggerSelectedText = ['selection:created', 'selection:updated'];
  const selectionClearedEvent = 'before:selection:cleared';

  const initCanvas = (canvasId = 'canvas') => {
    loadCustomFonts();
    
    canvas = new fabric.Canvas(canvasId);
    
    if (props.selectedImageUrl && props.selectedImageUrl.trim() !== '') {
      loadImageToCanvas(props.selectedImageUrl, null, canvas, () => {
        lastCanvasDimensions.value = { width: canvas.width, height: canvas.height };
      });
    }
    
    emit('update:canvas', canvas);

    eventsToTriggerSelectedText.forEach((event) => {
      canvas.on(event, (e) => {
        [selectedTextBox.value] = e.selected;
        emit('update:font', selectedTextBox.value.fontName);
      });
    });

    canvas.on(selectionClearedEvent, () => {
      if (selectedTextBox.value?.text === null || selectedTextBox.value?.text === '') {
        deleteSelectedTextBoxFromCanvas(canvas);
      }
      selectedTextBox.value = null;
    });

    const handleKeydown = (e) => {
      const supprKeyPressed = e.key === 'Delete' && !e.ctrlKey;
      const textIsBeingEdited = selectedTextBox.value?.isEditing;

      if (supprKeyPressed && !textIsBeingEdited) {
        deleteSelectedTextBoxFromCanvas(canvas);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  };

  watch(() => props.selectedImageUrl, (newUrl) => {
    if (!canvas || !newUrl || newUrl.trim() === '') return;
    loadImageToCanvas(newUrl, lastCanvasDimensions.value, canvas, () => {
      lastCanvasDimensions.value = { width: canvas.width, height: canvas.height };
    });
  });

  watch(() => props.font, (newFont) => {
    if (!selectedTextBox.value || !canvas) return;
    setTextFont(selectedTextBox.value, newFont);
    canvas.renderAll();
  });

  const downloadCanvas = () => {
    if (!canvas) return;

    const format = 'jpeg';
    const dataURL = canvas.toDataURL({
      format,
      quality: 1,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${DOWNLOADED_FILE_NAME}.${format}`;
    link.click();
  };

  const uploadImage = () => {
    if (!canvas) return;
    uploadCustomImage(lastCanvasDimensions.value, canvas, () => {
      lastCanvasDimensions.value = { width: canvas.width, height: canvas.height };
    });
  };

  const deleteSelectedText = () => {
    if (!canvas || !selectedTextBox.value) return;
    deleteSelectedTextBoxFromCanvas(canvas);
    selectedTextBox.value = null;
  };

  return {
    canvas,
    selectedTextBox,
    initCanvas,
    downloadCanvas,
    uploadImage,
    deleteSelectedText,
  };
}
