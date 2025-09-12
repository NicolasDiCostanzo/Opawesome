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
    <div class="mobile-canvas-container">
      <canvas id="mobile-canvas"></canvas>
    </div>
    
    <div class="mobile-actions">
      <button @click="uploadImage" class="mobile-btn upload-btn">
          {{ UPLOAD_BUTTON_TEXT }}
      </button>
      <button @click="downloadCanvas" class="mobile-btn download-btn">
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
  padding: 0.25rem;
  gap: 0.75rem;
}

.mobile-canvas-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  min-height: 180px;
  
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
  margin-top: auto;
}

.mobile-btn {
  flex: 1;
  min-width: 100px;
  padding: 0.6rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 6px;
  font-weight: 600;
}

.upload-btn {
  background-color: var(--bistre);
}

.download-btn {
  background-color: var(--coyote);
}

@media (max-height: 650px) {
  .mobile-center {
    padding: 0.125rem;
    gap: 0.5rem;
  }
  
  .mobile-canvas-container {
    min-height: 150px;
  }
  
  .mobile-btn {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
    min-width: 90px;
  }
}

</style>
