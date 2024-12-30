<script setup>
import {defineProps } from "vue"
import { LEFT_PART_TEXT } from '../../constants/texts';
import { addTextFieldOnCanvas } from '@/helper/canvas-helper';

const props = defineProps(['canvas']);

const addTextOnCanvas = () => {
  if (props.canvas) {
    addTextFieldOnCanvas(props.canvas);
  } else {
    console.error('Canvas not found');
  }
};
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
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
