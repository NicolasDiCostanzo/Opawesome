<script setup>
import { ref, watch } from 'vue';
import { addTextFieldOnCanvas } from '../../helpers/canvas-helper';
import fonts from '../../constants/fonts.json';
import { LEFT_PART_TEXT, ADD_BUTTON_TEXT } from '../../constants/labels';
import { selectedFontColorIsEditable } from '../../helpers/fonts-helper';

const props = defineProps(['canvas', 'font', 'fontColor']);
const emit = defineEmits(['update:font', 'update:color']);
const selectedFont = ref(props.font);
const fontColor = ref(props.fontColor);
const currentFontIsEditable = ref(selectedFontColorIsEditable(selectedFont.value));

watch(() => props.font, (newFont) => {
  selectedFont.value = newFont;
  currentFontIsEditable.value = selectedFontColorIsEditable(selectedFont.value);
});

watch(() => selectedFont, (newSelectedFont) => {
  emit('update:font', newSelectedFont);
});

watch(() => props.fontColor, (newFontColor) => {
  fontColor.value = newFontColor;
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

function updateTextColor(event) {
  emit('update:color', event.target.value);
}
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <select v-model="selectedFont" :style="{ fontFamily: selectedFont }" @change="updateTextboxFont">
        <option v-for="font in fonts" :key="font.name" :value="font.name" :style="{ fontFamily: font.name }">{{
          font.name }}</option>
      </select>
      <input v-if="currentFontIsEditable" type="color" @change="updateTextColor" v-model="fontColor"/>
      <button @click=addTextOnCanvas>{{ADD_BUTTON_TEXT}}</button>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '../../constants/style/select.scss';

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

</style>
