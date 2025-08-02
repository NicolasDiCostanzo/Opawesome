<script setup>
import { ref } from 'vue';
import fonts from '../../constants/fonts.json';

const selectedFont = ref(fonts[0]);
const emit = defineEmits(['update:font']);

function selectFont(font) {
  selectedFont.value = font;
  emit('update:font', font.name);
}
</script>

<template>
  <div class="buttons-selection">
    <button
      v-for="font in fonts"
      :key="font.name"
      :class="{ active: selectedFont.name === font.name }"
      :style="{ backgroundImage: `url(${font.image})` }"
      @click="selectFont(font)"
    >
      {{ font.name }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.buttons-selection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
}

button {
  margin: 0.25rem 0;
  padding: 0.5rem;
  border: 2px solid transparent;
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: border-color 0.2s;
}

button:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

button.active {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
