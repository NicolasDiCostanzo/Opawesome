<script setup>
import { defineProps, onMounted, watch } from 'vue';
import { Canvas, FabricImage, Textbox } from 'fabric';
import images from "../../constants/images.json"

const props = defineProps({
  selectedImageUrl: {
    type: String,
    Required: true,
    default: images[0].url
  }
});

let canvas;

onMounted(() => {
  canvas = new Canvas("canvas");
  loadImageToCanvas(props.selectedImageUrl);
  loadFontsAndAddTextbox();
  console.log(canvas);
});

watch(props.selectedImageUrl, (newUrl) => {
  loadImageToCanvas(newUrl);
  console.log(canvas);
})

/**
 * Set the loaded image to the canvas' background
 */
function loadImageToCanvas(url) {
  console.log(url);
  FabricImage.fromURL(url, (img) => {
    console.log("hello")
    canvas.clear();
    const scaleX= canvas.width / img.width;
    const scaleY= canvas.height / img.height;

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX,
      scaleY
    });
  });
}

function loadFontsAndAddTextbox() {
  const urlMap = {
    VT323: 'url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2)',
    Pacifico: 'url(https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2)',
    Lato100: 'url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30AXC-qNiXg7Q.woff2)',
    Lato900: 'url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2)',
  };

  const fontVT323 = new FontFace('VT323', urlMap.VT323, {
    style: 'normal',
    weight: 'normal',
  });

  Promise.all([fontVT323.load()]).then(() => {
    document.fonts.add(fontVT323);

    const vtTextBox = new Textbox('test ptn', {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 60,
      fontFamily: 'VT323',
      fill: 'black'
    });

    canvas.add(vtTextBox);
    canvas.renderAll();
    console.log(canvas);
  });
}
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