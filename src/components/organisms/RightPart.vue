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
        <li v-for="image in images" :key="image.id">
          <img :src=image.url @click="selectImage(image.url)">
        </li>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../constants/style/constants.scss' as *;

$space-around-images: 15px;

li {
  all: unset;
}

.right-part {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
}

#imagesContainer {
    overflow-y: auto;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(2, $IMAGES_SIZE);
    gap:$space-around-images;
    padding:$space-around-images;
    align-content: start;
}

img {
    max-width: $IMAGES_SIZE;
    max-height: $IMAGES_SIZE;
    transition: transform 0.3s ease;

}

img:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.356) 0px 0px 7.5px;
    transform: rotate(3.5deg); // maybe random ?
}

#selected {
    border: 1px solid var(--tea-rose-red);
}

.selected {
    border: 1px solid var(--tea-rose-red);
}
</style>
