<script setup>
import CenterPart from '../organisms/mobile/CenterPart.vue';
import LeftPart from '../organisms/mobile/LeftPart.vue';
import RightPart from '../organisms/RightPart.vue';
import useLayoutHandlers from '../../composables/useLayoutHandlers';

defineProps([
  'selectedImgUrl',
  'canvas',
  'font',
]);

const emit = defineEmits([
  'update:canvas',
  'update:font',
  'update:selectNewImage',
]);

const { handleCanvasUpdate, handleFontUpdate, handleImageSelection } = useLayoutHandlers(emit);

</script>

<template>
  <div class="mobile-layout">
    <CenterPart
      class="mobile-center-part"
      :selectedImageUrl="selectedImgUrl"
      @update:canvas="handleCanvasUpdate"
      @update:font="handleFontUpdate"
      :font="font"
    />

    <LeftPart
      class="mobile-left-part"
      :canvas="canvas"
      :font="font"
      @update:font="handleFontUpdate"
    />

    <RightPart
      class="mobile-right-part"
      @update:selectNewImage="handleImageSelection"
    />
  </div>
</template>

<style lang="scss" scoped>
.mobile-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--coyote);
  width: 100%;
  overflow: hidden;
}

.mobile-center-part {
  flex: 1;
  min-height: 45%;
  padding: 0.75rem;
  margin: 0.25rem;
  background-color: var(--coyote);
  border-radius: 8px;
}

.mobile-left-part {
  background-color: var(--bistre);
  padding: 0.75rem;
  order: 2;
  min-height: 18%;
  max-height: 20%;
}

.mobile-right-part {
  background-color: var(--coyote);
  padding: 0.75rem;
  margin: 0.25rem;
  border-radius: 8px;
  order: 3;
  overflow-y: auto;
  min-height: 30%;
  max-height: 35%;
}

/* Extra compact layout for very small screens */
@media (max-height: 650px) {
  .mobile-layout {
    gap: 0.125rem;
    padding: 0.125rem;
  }
  
  .mobile-center-part {
    padding: 0.5rem;
    margin: 0.125rem;
    min-height: 40%;
  }
  
  .mobile-left-part {
    padding: 0.5rem;
    margin: 0 0.125rem;
    min-height: 16%;
    max-height: 18%;
  }
  
  .mobile-right-part {
    padding: 0.5rem;
    margin: 0.125rem;
    min-height: 32%;
    max-height: 38%;
  }
}
</style>
