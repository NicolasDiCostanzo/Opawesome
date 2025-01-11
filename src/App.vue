<script setup>
import { onMounted, ref } from 'vue';
import CenterPart from './components/organisms/CenterPart.vue';
import LeftPart from './components/organisms/LeftPart.vue';
import RightPart from './components/organisms/RightPart.vue';
import fonts from './constants/fonts.json';
import images from './constants/images.json';

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
    <LeftPart class="left-part" :canvas="canvas" :font="font" @update:font="updateFont"/>
    <CenterPart class="center-part" :selectedImageUrl="selectedImgUrl" @update:canvas="updateCanvas" @update:font="updateFont" :font="font"/>
    <RightPart class="right-part" @update:selectNewImage="selectedImageUrl"/>
</template>

<style lang="scss">
@import './constants/style/colors.scss';
@import './constants/style/button.scss';

  body {
    background-color: var(--bistre);
    overflow: hidden;
    margin: 0;
    user-select: none;
  }

  body, button {
    font-family: 'Courier New', Courier, monospace;
  }

  div {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

  .center-part {
    flex: 2;
  }

  .left-part, .right-part {
    background-color: var(--coyote);
    flex: 1;
  }
</style>
