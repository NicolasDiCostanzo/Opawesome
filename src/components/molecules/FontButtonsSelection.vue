<script setup>
import { ref, computed } from 'vue';
import fontParameters from '../../helpers/font-parameters';

const fontArray = computed(() => Object.entries(fontParameters).map(([key, value]) => ({
  fontName: key,
  ...value,
})));

const selectedFont = ref(fontArray.value[0]);
const emit = defineEmits(['update:font']);

function selectFont(font) {
  selectedFont.value = font;
  emit('update:font', font.fontName);
}
</script>

<template>
  <div class="buttons-selection">
    <button
      v-for="font in fontArray"
      :key="font.fontFamily"
      :class="{ active: selectedFont.fontName === font.fontName }"
      :style="{ backgroundImage: `url(${font.image})` }"
      @click="selectFont(font)"
    />
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
  background-size: cover;
  background-position: center;
  cursor: pointer;
  width: 200px;
  height: 50px;
}

button.active {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
