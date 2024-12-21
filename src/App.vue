<script setup>
import { ref } from 'vue';
import LeftPart from './components/organisms/LeftPart.vue';
import CenterPart from './components/organisms/CenterPart.vue';
import RightPart from './components/organisms/RightPart.vue';

const selectedImgUrl = ref(null);

function selectedImageUrl(selectedImageUrl) {
  selectedImgUrl.value = selectedImageUrl;
}
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
