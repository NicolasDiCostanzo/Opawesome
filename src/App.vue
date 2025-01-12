<script setup>
import { onMounted, ref } from 'vue';
import CenterPart from './components/organisms/CenterPart.vue';
import LeftPart from './components/organisms/LeftPart.vue';
import RightPart from './components/organisms/RightPart.vue';
import fonts from './constants/fonts.json';
import images from './constants/images.json';
import { APP_NAME } from './constants/labels';

const selectedImgUrl = ref('');
let canvas;
const font = ref(fonts[0].name);

function selectedImageUrl(newSelectedImageUrl) {
  selectedImgUrl.value = newSelectedImageUrl.value;
}

function updateCanvas(newCanvas) {
  canvas = newCanvas;
}

function updateFont(newFont) {
  font.value = newFont;
}

onMounted(async () => {
  selectedImgUrl.value = images[0].url;
});
</script>

<template>
  <div class="container">
  <header>
    <h1>{{ APP_NAME }}</h1>
  </header>
  <div class="app">
    <LeftPart class="left-part" :canvas="canvas" :font="font" @update:font="updateFont"/>
    <CenterPart class="center-part" :selectedImageUrl="selectedImgUrl" @update:canvas="updateCanvas" @update:font="updateFont" :font="font"/>
    <RightPart class="right-part" @update:selectNewImage="selectedImageUrl"/>
  </div>
  <footer>Footer</footer>
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
}

header {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Opossum Regular', sans-serif;

  h1 {
    all: unset;
    color: antiquewhite;
    font-size: 2em;
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
