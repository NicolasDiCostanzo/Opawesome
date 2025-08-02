<script setup>
import { ref, watch } from 'vue';
import { addTextFieldOnCanvas } from '../../helpers/canvas-helper';
import FontButtonsSelection from '../molecules/FontButtonsSelection.vue';

const props = defineProps(['canvas', 'font']);
const emit = defineEmits(['update:font']);
const selectedFont = ref(props.font);

watch(
  () => props.font,
  (newFont) => {
    selectedFont.value = newFont;
  },
);

function handleFontUpdate(fontName) {
  selectedFont.value = fontName;
  emit('update:font', fontName);
}

const addTextOnCanvas = () => {
  if (!props.canvas) {
    throw new Error('Canvas is not defined');
  }
  addTextFieldOnCanvas(props.canvas, selectedFont.value);
};
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <FontButtonsSelection @update:font="handleFontUpdate" />
      <button @click="addTextOnCanvas">{{ ADD_BUTTON_TEXT }}</button>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "../../constants/style/select.scss";

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
