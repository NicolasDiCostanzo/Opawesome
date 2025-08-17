<script setup>
import CenterPart from '../organisms/desktop/CenterPart.vue';
import LeftPart from '../organisms/desktop/LeftPart.vue';
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
  <div class="desktop-layout">
    <div class="desktop-content">
      <LeftPart
        class="desktop-left-part"
        :canvas="canvas"
        :font="font"
        @update:font="handleFontUpdate"
      />

      <CenterPart
        class="desktop-center-part"
        :selectedImageUrl="selectedImgUrl"
        @update:canvas="handleCanvasUpdate"
        @update:font="handleFontUpdate"
        :font="font"
      />

      <RightPart
        class="desktop-right-part"
        @update:selectNewImage="handleImageSelection"
      />
    </div>
    <footer class="desktop-footer">Footer</footer>
  </div>
</template>

<style lang="scss" scoped>
.desktop-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.desktop-content {
  display: flex;
  flex-direction: row;
  height: 85vh;
  margin: 0;
}

.desktop-left-part, .desktop-right-part {
  background-color: var(--coyote);
  flex: 1;
}

.desktop-center-part {
  flex: 2;
}

.desktop-footer {
  height: 5vh;
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);
}
</style>
