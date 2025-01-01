<script setup>
import { defineProps, onMounted, watch, defineEmits, ref } from 'vue';
import { fabric } from 'fabric';
import { loadImageToCanvas } from '@/helper/canvas-helper';

const props = defineProps(['selectedImageUrl']);
const emit = defineEmits(['update:canvas', 'update:font']);
const canvas = ref("hello");

/**
 * 'selection:created': fabricjs custom events for when a textbox is first selected
 * 'selection:updated': fabricjs custom events for when the textbox selected changes
 */
const eventsToTriggerSelectedText = ['selection:created', 'selection:updated'];

onMounted(() => {
  canvas.value = new fabric.Canvas("canvas");
  loadImageToCanvas(props.selectedImageUrl, canvas.value);
  emit('update:canvas', canvas.value);

  eventsToTriggerSelectedText.forEach((event) => {
    canvas.value.on(event, (e) => {
    const selectedTextBox = e.selected[0];
    emit('update:font', selectedTextBox.fontFamily);
  });
  });
});

watch(() => props.selectedImageUrl, (newUrl) => {
  loadImageToCanvas(newUrl, canvas.value);
});
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