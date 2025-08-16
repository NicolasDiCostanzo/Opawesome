<script setup>
import { onMounted, ref } from 'vue';
import images from './constants/images.json';
import useMobileState from './composables/useMobileState';
import DesktopLayout from './components/layouts/DesktopLayout.vue';
import MobileLayout from './components/layouts/MobileLayout.vue';

const selectedImgUrl = ref('');
let canvas;
const font = ref('Arial');
const { isMobile } = useMobileState();

function selectedImageUrl(newSelectedImageUrl) {
  selectedImgUrl.value = newSelectedImageUrl.value;
}

function updateCanvas(newCanvas) {
  canvas = newCanvas;
}

function updateFont(newFontName) {
  font.value = newFontName;
}

onMounted(async () => {
  selectedImgUrl.value = images[0].url;
});
</script>

<template>
  <div class="container">
    <div class="app">
      <DesktopLayout
        v-if="!isMobile"
        :selectedImgUrl="selectedImgUrl"
        :canvas="canvas"
        :font="font"
        @update:canvas="updateCanvas"
        @update:font="updateFont"
        @update:selectNewImage="selectedImageUrl"
      />
      <MobileLayout
        v-else
        :selectedImgUrl="selectedImgUrl"
        :canvas="canvas"
        :font="font"
        @update:canvas="updateCanvas"
        @update:font="updateFont"
        @update:selectNewImage="selectedImageUrl"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import './constants/style/colors.scss';
@import './constants/style/button.scss';

@font-face {
    font-family: 'Opossum Regular';
    font-style: normal;
    font-weight: normal;
    src: url('./assets/fonts/opossum.woff') format('woff');
}

.app {
  display: flex;
  flex-direction: row;
  margin: 0;
  height: 85vh;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 100vh;
  }
}

header {
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Opossum Regular', sans-serif;
  gap: 3rem;

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

footer {
  height: 5vh;
}

header, footer {
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);
}

.center-part {
  flex: 2;
}

.left-part, .right-part {
  background-color: var(--coyote);
  flex: 1;
}

body {
  background-color: var(--bistre);
  margin: 0;
  user-select: none;
}

body, button {
  font-family: 'Courier New', Courier, monospace;
}
</style>
