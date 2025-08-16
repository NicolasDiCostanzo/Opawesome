<script setup>
import CenterPart from '../organisms/CenterPart.vue';
import LeftPart from '../organisms/LeftPart.vue';
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
  background-color: var(--bistre);
}

.mobile-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--smoky-black);
  color: antiquewhite;
  font-family: 'Opossum Regular', sans-serif;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
}

.mobile-center-part {
  flex: 1;
  min-height: 0; // Important for flex children
}

.mobile-left-part {
  background-color: var(--coyote);
  padding: 1rem;
  order: 2;
}

.mobile-right-part {
  background-color: var(--coyote);
  padding: 1rem;
  order: 3;
  max-height: 200px;
  overflow-y: auto;
}
</style>
