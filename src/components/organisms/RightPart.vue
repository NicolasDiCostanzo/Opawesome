<script setup>
import { ref } from 'vue';
import images from '../../constants/images.json';

const selectedImageUrl = ref(images[0].id);
const emit = defineEmits(['update:selectNewImage']);

function selectImage(imageUrl) {
  selectedImageUrl.value = imageUrl;
  emit('update:selectNewImage', selectedImageUrl);
}

</script>

<template>
    <div class="right-part">
      <div id="imagesContainer">
        <ul>
          <li v-for="image in images" :key="image.id">
            <img :class="selectedImageUrl === image.url ? 'selected' : ''" :src=image.url @click="selectImage(image.url)" alt='cute opossum option'/>
          </li>
        </ul>
      </div>
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
    gap:$space-around-images;
    padding:$space-around-images;
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
}

img {
    max-width: $IMAGES_SIZE;
    max-height: $IMAGES_SIZE;
    transition: transform 0.25s ease, box-shadow 0.1s ease;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 15px;
}

img:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 1) 0px 0px 15px;
    transform: rotate(3.5deg); // maybe random ?
}

img.selected {
    box-shadow: 0 0 0 2px var(--tea-rose-red);
    box-sizing: border-box;
}
</style>
