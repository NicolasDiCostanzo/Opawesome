<script setup>
import { onMounted, ref } from 'vue';
import LeftPart from './components/organisms/LeftPart.vue';
import CenterPart from './components/organisms/CenterPart.vue';
import RightPart from './components/organisms/RightPart.vue';
import fonts from './constants/fonts.json';
import images from "./constants/images.json"
const selectedImgUrl = ref("");
let canvas;
const font = ref(fonts[0].name);

function selectedImageUrl(selectedImageUrl) {
  selectedImgUrl.value = selectedImageUrl.value;
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
  <div>
    <LeftPart :canvas="canvas" :font="font" @update:font="updateFont"/>
    <CenterPart :selectedImageUrl="selectedImgUrl" @update:canvas="updateCanvas" @update:font="updateFont" :font="font"/>
    <RightPart @update:selectNewImage="selectedImageUrl"/>
  </div>
</template>

<style>
  div {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

div > :first-child, div > :last-child {
  flex: 1;
}

div > :nth-child(2) {
  flex: 2;
}
</style>
