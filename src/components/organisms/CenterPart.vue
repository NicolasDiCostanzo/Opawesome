<script setup>
import { defineProps, onMounted, watch, defineEmits, ref } from 'vue';
import { fabric } from 'fabric';
import { loadImageToCanvas } from '@/helper/canvas-helper';

const props = defineProps(['selectedImageUrl']);


const emit = defineEmits(['update:canvas']);
const canvas = ref("hello");


onMounted(() => {
  canvas.value = new fabric.Canvas("canvas");
  loadImageToCanvas(props.selectedImageUrl, canvas.value);
  emit('update:canvas', canvas.value);
});

watch(() => props.selectedImageUrl, (newUrl) => {
  loadImageToCanvas(newUrl, canvas.value);
});



</script>

<template>
    <div class="center-part">
      <main>
        <span id="wrapper">
          <button>Generate</button>
          <span id="img-wrapper">
            <canvas id="canvas"></canvas>
          </span>
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

#img-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-picture {
    min-height: $CENTER_IMAGE_MIN_SIZE;
    min-width: $CENTER_IMAGE_MIN_SIZE;
    max-height: $CENTER_IMAGE_MAX_SIZE;
    max-width: $CENTER_IMAGE_MAX_SIZE;
}
</style>