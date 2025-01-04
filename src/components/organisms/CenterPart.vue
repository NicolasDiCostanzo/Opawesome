<script setup>
import { defineProps, onMounted, watch, defineEmits } from 'vue';
import { fabric } from 'fabric';
import { loadImageToCanvas } from '@/helper/canvas-helper';
import FontsHelper from '@/helper/fonts-helper';

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
  canvas = new fabric.Canvas("canvas");
  loadImageToCanvas(props.selectedImageUrl, canvas);
  emit('update:canvas', canvas);

  eventsToTriggerSelectedText.forEach((event) => {
    canvas.on(event, (e) => {
      selectedTextBox = e.selected[0];
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
  if(!selectedTextBox) return;
  console.log('selected box', selectedTextBox);
  fontsHelper.setTextFont(selectedTextBox, newFont);
  canvas.renderAll();
})
</script>

<template>
    <div class="center-part">
      <main>
        <span id="wrapper">
            <canvas id="canvas"></canvas>
          <button>Download</button>
        </span>
      </main>
    </div>
  </template>

<style lang="scss">
@import '../../constants/style/constants.scss';

main {
    display: flex;
    justify-content: center;
    height: 100%;
}

#wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    gap: 3rem;
    width: 80%;
    height: 80%;
}

.main-picture {
    min-height: $CENTER_IMAGE_MIN_SIZE;
    min-width: $CENTER_IMAGE_MIN_SIZE;
    max-height: $CENTER_IMAGE_MAX_SIZE;
    max-width: $CENTER_IMAGE_MAX_SIZE;
}
</style>