<script setup>
import { onMounted, ref } from 'vue';
import LeftPart from './components/organisms/LeftPart.vue';
import CenterPart from './components/organisms/CenterPart.vue';
import RightPart from './components/organisms/RightPart.vue';

import images from "./constants/images.json"
const selectedImgUrl = ref(images[0].url);

function selectedImageUrl(selectedImageUrl) {
  selectedImgUrl.value = selectedImageUrl.value;
}

onMounted(() => selectedImgUrl.value = images[0].url);
</script>

<template>
  <div>
    <LeftPart />
    <CenterPart :selectedImageUrl="selectedImgUrl"/>
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
