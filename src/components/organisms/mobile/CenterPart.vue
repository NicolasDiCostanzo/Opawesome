<script setup>
import { onMounted, onUnmounted } from 'vue';
import { DOWNLOAD_BUTTON_TEXT, UPLOAD_BUTTON_TEXT } from '../../../constants/labels';
import useCenterPartLogic from '../../../composables/useCenterPartLogic';

const props = defineProps(['selectedImageUrl', 'font']);
const emit = defineEmits(['update:canvas', 'update:font']);

const { initCanvas, downloadCanvas, uploadImage } = useCenterPartLogic(props, emit);

let cleanup;

onMounted(() => {
  cleanup = initCanvas('mobile-canvas');
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<template>
  <main class="mobile-center">
    <!-- Mobile-specific layout: vertical stack -->
    <div class="mobile-canvas-container">
      <canvas id="mobile-canvas"></canvas>
    </div>
    
    <!-- Mobile-specific button layout -->
    <div class="mobile-actions">
      <button @click="uploadImage" class="mobile-btn">
          {{ UPLOAD_BUTTON_TEXT }}
      </button>
      <button @click="downloadCanvas" class="mobile-btn">
          {{ DOWNLOAD_BUTTON_TEXT }}
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../../../constants/style/constants.scss' as *;

.mobile-center {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  gap: 1rem;
}

.mobile-canvas-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
  
  canvas {
    max-width: 100%;
    max-height: 100%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
    border-radius: 4px;
  }
}

.mobile-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.mobile-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem;
  font-size: 0.9rem;
  border-radius: 8px;
}
</style>
