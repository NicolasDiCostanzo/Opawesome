<script setup>
import { defineProps, onMounted } from 'vue';
import images from "../../constants/images.json"

const props = defineProps({
  selectedImageUrl: {
    type: String,
    Required: true,
    default: images[0].url
  }
});

onMounted(() => {
  console.log("default: ", props.selectedImageUrl);
});
</script>

<template>
    <div class="center-part">
      <main>
        <span id="wrapper">
          <button>Generate</button>
          <span id="img-wrapper">
            <img class="main-picture" :src="props.selectedImageUrl" alt="this should show cute possums">
          </span>
          <button>Download</button>
        </span>
      </main>
    </div>
  </template>

<style lang="scss">
@import '../../constants/style/constants.scss';

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

.main-picture {
    min-height: $center-image-min-size;
    min-width: $center-image-min-size;
    max-height: $center-image-max-size;
    max-width: $center-image-max-size;
}
</style>