<script setup>
import { ref, computed } from 'vue';
import fontParameters from '../../helpers/font-parameters';
import useMobileState from '../../composables/useMobileState';

const { isMobile } = useMobileState();

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
  <div class="buttons-selection" :class="{ mobile: isMobile }">
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
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;

  button {
      width: 200px;
  }
  
  &.mobile {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
    overflow-x: auto;
    justify-content: flex-start;
    margin: 0;

    button {
      width: 75px;
      flex-shrink: 0;
    }
  }
}

  button {
      margin: 0.25rem 0;
      padding: 0.5rem;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      height: 50px;
  }

button.active {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
