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
        selectedTextBox.value = e.selected;

        const isSingleTextboxSelected = selectedTextBox.value?.length === 1 && selectedTextBox.value[0].type === 'textbox';

        if (isSingleTextboxSelected) {
          emit('update:font', selectedTextBox.value[0].fontName);
        } else if (selectedTextBox.value?.length > 1) {
          const allTextboxes = selectedTextBox.value.filter((obj) => obj.type === 'textbox');
          const allHaveSameFont = allTextboxes.length > 0 && allTextboxes.every((textBox) => textBox.fontName === allTextboxes[0].fontName);

          if (allHaveSameFont) {
            emit('update:font', allTextboxes[0].fontName);
          } else {
            emit('update:font', null);
          }
        }
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

      if (supprKeyPressed) {
        const activeObject = canvas.getActiveObject();
        let textIsBeingEdited = false;

        if (activeObject) {
          if (activeObject.type === 'textbox') {
            textIsBeingEdited = activeObject.isEditing;
          } else if (activeObject.type === 'activeSelection') {
            // Check if any textbox in the selection is being edited
            const selectedObjects = activeObject.getObjects();
            textIsBeingEdited = selectedObjects.some((obj) => obj.type === 'textbox' && obj.isEditing);
          }
        }

        if (!textIsBeingEdited) {
          deleteSelectedTextBoxFromCanvas(canvas);
        }
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
    if (!selectedTextBox.value || !canvas || !newFont) return;
    selectedTextBox.value.forEach((textBox) => {
      setTextFont(textBox, newFont);
    });
    canvas.renderAll();
  });

  const downloadCanvas = () => {
    if (!canvas) return;

    const format = 'png';
    const scale = 2;
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    // Temporarily scale canvas
    canvas.setDimensions({ width: originalWidth * scale, height: originalHeight * scale }, { backstoreOnly: true });
    canvas.setZoom(scale);

    const dataURL = canvas.toDataURL({
      format,
    });

    canvas.setZoom(1);
    canvas.setDimensions({ width: originalWidth, height: originalHeight }, { backstoreOnly: true });

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
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

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
