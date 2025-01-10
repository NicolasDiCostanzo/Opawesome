<script setup>
import { ref, watch } from 'vue';
import { addTextFieldOnCanvas } from '../../helpers/canvas-helper';
import fonts from '../../constants/fonts.json';
import { LEFT_PART_TEXT, ADD_BUTTON_TEXT } from '../../constants/labels';

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
      <button @click=addTextOnCanvas>{{ADD_BUTTON_TEXT}}</button>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.left-part {
  display: flex;
  justify-content: center;
}

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 80%;
  gap: 2rem;
}

select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: antiquewhite;
    border: 1px solid var(--black);
    font-size: 1rem;
    height: 35px;
}
</style>
