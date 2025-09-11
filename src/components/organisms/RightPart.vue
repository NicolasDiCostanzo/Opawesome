<script setup>
import { ref, nextTick } from 'vue';
import useMobileState from '../../composables/useMobileState';
import imagesData from '../../constants/images.json';
import { SHUFFLE_IMAGE_BUTTON_TEXT } from '../../constants/labels';

const images = ref(imagesData.map((image) => ({
  id: image.id,
  url: `/images/${image.url}`,
})));

const initialShuffled = [...images.value];
for (let i = 0; i < initialShuffled.length - 1; i++) {
  const j = Math.floor(Math.random() * (i + 1));
  [initialShuffled[i], initialShuffled[j]] = [initialShuffled[j], initialShuffled[i]];
}
images.value = initialShuffled;

const { isMobile } = useMobileState();
const selectedImageUrl = ref(images.value[0].url);
const imagesList = ref(null);
const imagesContainer = ref(null);
const emit = defineEmits(['update:selectNewImage']);

// Emit initial selection immediately
emit('update:selectNewImage', selectedImageUrl);

function selectImage(imageUrl) {
  selectedImageUrl.value = imageUrl;
  emit('update:selectNewImage', selectedImageUrl);
}

function shuffleImages() {
  const newShuffled = [...images.value];
  
  for (let i = 0; i < newShuffled.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [newShuffled[i], newShuffled[j]] = [newShuffled[j], newShuffled[i]];
  }
  images.value = newShuffled;
  
  selectedImageUrl.value = images.value[0].url;
  emit('update:selectNewImage', selectedImageUrl);
  
  nextTick(() => {
    if (isMobile.value && imagesList.value) {
      imagesList.value.scrollTo({ left: 0, behavior: 'auto' });
    } else if (!isMobile.value && imagesContainer.value) {
      imagesContainer.value.scrollTo({ top: 0, behavior: 'auto' });
    }
  });
}
</script>

<template>
  <div class="right-part" :class="{ mobile: isMobile }">
    <div class="images-container" ref="imagesContainer">
      <ul ref="imagesList">
        <li v-for="image in images" :key="image.id">
          <img :class="selectedImageUrl === image.url ? 'selected' : ''" :src=image.url @click="selectImage(image.url)"
            alt='cute opossum option' />
        </li>
      </ul>
    </div>
    <button class="shuffle-button" @click="shuffleImages">{{ SHUFFLE_IMAGE_BUTTON_TEXT }}</button>
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

  .shuffle-button {
    margin: 10px;
  }
</style>
