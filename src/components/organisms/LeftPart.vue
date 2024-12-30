<script setup>
import {defineProps, ref } from "vue"
import { LEFT_PART_TEXT } from '../../constants/texts';
import fonts from '../../constants/fonts.json';
import { addTextFieldOnCanvas } from '@/helper/canvas-helper';

const props = defineProps(['canvas']);
const selectedFont = ref(fonts[0].name);

const addTextOnCanvas = () => {
  if (!props.canvas) console.error('Canvas not found');
  addTextFieldOnCanvas(props.canvas, selectedFont.value);
};
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <select v-model="selectedFont" :style="{ fontFamily: selectedFont }">
        <option v-for="font in fonts" :key="font.name" :value="font.name" :style="{ fontFamily: font.name }">{{ font.name }}</option>
      </select>
      <button @click=addTextOnCanvas()>Add</button>
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
