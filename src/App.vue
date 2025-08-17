<script setup>
import { ref } from 'vue';
import useMobileState from './composables/useMobileState';
import CommonHeader from './components/organisms/CommonHeader.vue';
import DesktopLayout from './components/layouts/DesktopLayout.vue';
import MobileLayout from './components/layouts/MobileLayout.vue';
import CommonFooter from './components/organisms/CommonFooter.vue';

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
</script>

<template>
  <div class="container">
    <div class="app">
      <CommonHeader />
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
      <CommonFooter />
    </div>
  </div>
</template>

<style lang="scss">
@import './constants/style/colors.scss';
@import './constants/style/button.scss';

.app {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
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
