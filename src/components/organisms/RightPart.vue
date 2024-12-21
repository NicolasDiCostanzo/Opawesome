<script setup>
import { ref, defineEmits } from "vue";
import images from "../../constants/images.json"
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

<style lang="scss">
@import '../../constants/style/constants.scss';

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
    grid-template-columns: repeat(2, #{$images-size});
    gap: #{$space-around-images};
    padding: #{$space-around-images};
}

img {
    max-width: #{$images-size};
    max-height: #{$images-size};
}

img:hover {
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

#selected {
    border: 1px solid var(--tea-rose-red);
}

.selected {
    border: 1px solid var(--tea-rose-red);
}
</style>
