<script setup>
import { fabric } from 'fabric';
import { onMounted, watch } from 'vue';
import { DOWNLOADED_FILE_NAME, DOWNLOAD_BUTTON_TEXT, UPLOAD_BUTTON_TEXT } from '../../constants/labels';
import { loadImageToCanvas } from '../../helpers/canvas-helper';
import FontsHelper from '../../helpers/fonts-helper';

const props = defineProps(['selectedImageUrl', 'font']);
const emit = defineEmits(['update:canvas', 'update:font']);
const fontsHelper = new FontsHelper();
let canvas;

/**
 * 'selection:created': fabricjs custom events for when a textbox is first selected
 * 'selection:updated': fabricjs custom events for when the textbox selected changes
 */
const eventsToTriggerSelectedText = ['selection:created', 'selection:updated'];

/**
 * 'selection:cleared': fabricjs custom event for when the selection is cleared
 */
const selectionClearedEvent = 'selection:cleared';

let selectedTextBox;
onMounted(() => {
  canvas = new fabric.Canvas('canvas');
  loadImageToCanvas(props.selectedImageUrl, canvas);
  emit('update:canvas', canvas);

  eventsToTriggerSelectedText.forEach((event) => {
    canvas.on(event, (e) => {
      [selectedTextBox] = e.selected;
      emit('update:font', selectedTextBox.fontFamily);
    });
  });

  canvas.on(selectionClearedEvent, () => {
    selectedTextBox = null;
  });
});

watch(() => props.selectedImageUrl, (newUrl) => {
  loadImageToCanvas(newUrl, canvas);
});

watch(() => props.font, (newFont) => {
  if (!selectedTextBox) return;
  fontsHelper.setTextFont(selectedTextBox, newFont);
  canvas.renderAll();
});

function downloadCanvas() {
  const format = 'jpeg';
  const dataURL = canvas.toDataURL({
    format,
    quality: 1,
  });

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${DOWNLOADED_FILE_NAME}.${format}`;
  link.click();
}

function uploadImage() {
  // TODO
}
</script>

<template>
      <main>
          <button @click="uploadImage">{{ UPLOAD_BUTTON_TEXT }}</button>
          <div class="canvas-container">
            <canvas id="canvas"></canvas>
          </div>
          <button @click="downloadCanvas">{{ DOWNLOAD_BUTTON_TEXT }}</button>
      </main>
  </template>

<style lang="scss" scoped>
@use '../../constants/style/constants.scss' as *;

main {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
}

.main-picture {
    min-height: $CENTER_IMAGE_MIN_SIZE;
    min-width: $CENTER_IMAGE_MIN_SIZE;
    max-height: $CENTER_IMAGE_MAX_SIZE;
    max-width: $CENTER_IMAGE_MAX_SIZE;
}

.canvas-container {
    display: flex;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    height: $CENTER_IMAGE_MAX_SIZE;
    align-items: center;
    transition: width 0.5s ease, height 0.5s ease;

    canvas {
    justify-self: center;
        width: 100%;
        height: 100%;
        box-shadow: black 0px 0px 10px;
    }
}
</style>
