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
  min-height: 50%;
  padding: 0 1em 1em 1em;
}

.mobile-left-part {
  background-color: var(--bistre);
  padding: 1rem;
  order: 2;
  min-height: 15%;
}

.mobile-right-part {
  background-color: var(--coyote);
  padding: 1rem;
  order: 3;
  overflow-y: auto;
  min-height: 35%;
}
</style>
