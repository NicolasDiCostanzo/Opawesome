<script>
import { defineComponent } from 'vue';
 
export default defineComponent({
    setup() {

    },
})
</script>

<template>
    <div class="right-part">
      <div id="imagesContainer">
        <!-- {imagesUrl.map((url, index) => (
          <SelectImage
            src={url}
            onImageClick={() => selectImage(index)}
            selected={selectedImageIndex === index}
            index={index}
          />
        ))} -->
      </div>
    </div>
</template>

<style lang="scss">
@import '../../constants/style/constants.scss';

$space-around-images: 15px;

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
