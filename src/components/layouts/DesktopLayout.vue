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
    <header class="desktop-header">
      <img src="../../assets/images/opossum.png" alt="Opossum logo" class="opossum-logo opossum-logo-left" />
      <h1>Opawesome</h1>
      <img src="../../assets/images/opossum.png" alt="Opossum logo" class="opossum-logo opossum-logo-right" />
    </header>

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

.desktop-header {
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Opossum Regular', sans-serif;
  gap: 3rem;
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);

  .opossum-logo {
    width: 75px;
  }

  h1 {
    all: unset;
    color: antiquewhite;
    font-size: 2em;
  }

  .opossum-logo-right {
    transform: rotateY(180deg);
  }
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
