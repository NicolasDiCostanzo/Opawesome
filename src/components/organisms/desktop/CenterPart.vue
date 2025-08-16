<script setup>
import { onMounted, onUnmounted } from 'vue';
import { DOWNLOAD_BUTTON_TEXT, UPLOAD_BUTTON_TEXT } from '../../../constants/labels';
import useCenterPartLogic from '../../../composables/useCenterPartLogic';

const props = defineProps(['selectedImageUrl', 'font']);
const emit = defineEmits(['update:canvas', 'update:font']);

const { initCanvas, downloadCanvas, uploadImage } = useCenterPartLogic(props, emit);

let cleanup;

onMounted(() => {
  cleanup = initCanvas('desktop-canvas');
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<template>
  <main class="desktop-center">
    <button @click="uploadImage" class="desktop-btn upload-btn">
      {{ UPLOAD_BUTTON_TEXT }}
    </button>

    <div class="desktop-canvas-container">
      <canvas id="desktop-canvas"></canvas>
    </div>
    
    <button @click="downloadCanvas" class="desktop-btn download-btn">
      {{ DOWNLOAD_BUTTON_TEXT }}
    </button>
  </main>
</template>

<style lang="scss" scoped>
@use '../../../constants/style/constants.scss' as *;

.desktop-center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding: 1rem;
}

.desktop-canvas-container {
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

.desktop-btn {
  min-width: 200px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}
</style>
