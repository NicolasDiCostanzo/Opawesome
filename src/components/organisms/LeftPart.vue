<script setup>
import { defineProps, ref, watch } from 'vue';
import { addTextFieldOnCanvas } from '../../helpers/canvas-helper';
import fonts from '../../constants/fonts.json';
import { LEFT_PART_TEXT } from '../../constants/texts';

const props = defineProps(['canvas', 'font']);
const emit = defineEmits(['update:font']);
const selectedFont = ref(props.font);

watch(() => props.font, (newFont) => {
  selectedFont.value = newFont;
});

watch(() => selectedFont, (newSelectedFont) => {
  emit('update:font', newSelectedFont);
});

const addTextOnCanvas = () => {
  if (!props.canvas) {
    throw new Error('Canvas is not defined');
  }
  addTextFieldOnCanvas(props.canvas, selectedFont.value);
};

function updateTextboxFont() {
  emit('update:font', selectedFont.value);
}
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <select v-model="selectedFont" :style="{ fontFamily: selectedFont }"  @change="updateTextboxFont">
        <option v-for="font in fonts" :key="font.name" :value="font.name" :style="{ fontFamily: font.name }">{{ font.name }}</option>
      </select>
      <button @click=addTextOnCanvas>Add</button>
    </span>
  </div>
</template>

<style lang="scss">
.left-part {
  display: flex;
  justify-content: center;
}

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2rem;
}
</style>
