<script setup>
import { onMounted, ref } from 'vue';
import LeftPart from './components/organisms/LeftPart.vue';
import CenterPart from './components/organisms/CenterPart.vue';
import RightPart from './components/organisms/RightPart.vue';

import images from "./constants/images.json"
const selectedImgUrl = ref("");
let canvas;

function selectedImageUrl(selectedImageUrl) {
  selectedImgUrl.value = selectedImageUrl.value;
}

function updateCanvas(newCanvas) {
  canvas = newCanvas;
}

onMounted(() => {
  selectedImgUrl.value = images[2].url;
});
</script>

<template>
  <div>
    <LeftPart :canvas="canvas"/>
    <CenterPart :selectedImageUrl="selectedImgUrl" @update:canvas="updateCanvas"/>
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
