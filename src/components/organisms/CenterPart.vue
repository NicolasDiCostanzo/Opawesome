<script setup>
import { defineProps } from 'vue';
const p = defineProps(['selectedImageUrl'])
console.log("selected image:", p.selectedImageUrl)
</script>

<template>
    <div class="center-part">
      <main>
        <span id="wrapper">
          <button>Generate</button>
          <span id="img-wrapper">
            <img :src="selectedImageUrl.value" alt="this should show cute possums">
          </span>
          <button>Download</button>
        </span>
      </main>
    </div>
  </template>

<style lang="scss">
main {
    display: flex;
    justify-content: center;
    height: 100%;
}

#wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    gap: 3rem;
    width: 80%;
    height: 80%;
}

#img-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    max-width: 100%;
    max-height: 100%;
}
</style>