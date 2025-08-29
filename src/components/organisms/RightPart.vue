<script setup>
import { ref } from 'vue';
import useMobileState from '../../composables/useMobileState';
import imagesData from '../../constants/images.json';
import { SHUFFLE_IMAGE_BUTTON_TEXT } from '../../constants/labels';

const images = ref(imagesData.map((image) => ({
  id: image.id,
  url: `/images/${image.url}`,
})));
const { isMobile } = useMobileState();
const selectedImageUrl = ref(`/images/${imagesData[0].url}`);
const emit = defineEmits(['update:selectNewImage']);

function selectImage(imageUrl) {
  selectedImageUrl.value = imageUrl;
  emit('update:selectNewImage', selectedImageUrl);
}

function shuffleImages() {
  const shuffled = [...images.value];
  
  for (let i = 0; i < shuffled.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  images.value = shuffled;
}
</script>

<template>
  <div class="right-part" :class="{ mobile: isMobile }">
    <div class="images-container">
      <ul>
        <li v-for="image in images" :key="image.id">
          <img :class="selectedImageUrl === image.url ? 'selected' : ''" :src=image.url @click="selectImage(image.url)"
            alt='cute opossum option' />
        </li>
      </ul>
    </div>
    <button @click="shuffleImages">{{ SHUFFLE_IMAGE_BUTTON_TEXT }}</button>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../constants/style/constants.scss' as *;

  $space-around-images: 15px;

  ul {
    overflow-y: auto;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(2, $IMAGES_SIZE);
    gap: $space-around-images;
    padding: $space-around-images;
    align-content: start;
  }

  li {
    all: unset;
  }

  .right-part {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    &.mobile {
      justify-content: start;
      
      .images-container {
        width: 100%;
      }
      
      ul {
        margin: 0;
        padding: 0.5em;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        gap: $space-around-images;
        align-items: flex-start;
        max-height: none;
        flex-shrink: 0;
        scroll-snap-type: x mandatory;
        
        li {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
      }
    }
  
    .images-container {
      overflow-y: auto;
    }
}

  img {
    max-width: $IMAGES_SIZE;
    max-height: $IMAGES_SIZE;
    transition: transform 0.25s ease, box-shadow 0.1s ease;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 15px;

    &:hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 1) 0px 0px 15px;
      transform: rotate(3.5deg); // maybe random ?
    }

    &.selected {
      box-shadow: 0 0 0 2px var(--tea-rose-red);
      box-sizing: border-box;
    }
  }
</style>
