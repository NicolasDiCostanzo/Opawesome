<script setup>
import { ref, computed, watch } from 'vue';
import fontParameters from '../../helpers/font-parameters';
import useMobileState from '../../composables/useMobileState';

const props = defineProps(['font']);
const { isMobile } = useMobileState();

const fontArray = computed(() => Object.entries(fontParameters).map(([key, value]) => ({
  fontName: key,
  ...value,
})));

const selectedFont = ref(null);
const emit = defineEmits(['update:font']);

// Watch for external font changes (when user selects a textbox)
watch(
  () => props.font,
  (newFont) => {
    if (newFont) {
      const matchingFont = fontArray.value.find((font) => font.fontName === newFont);
      if (matchingFont) {
        selectedFont.value = matchingFont;
      }
    } else {
      selectedFont.value = null;
    }
  },
  { immediate: true },
);

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
      :class="{ active: selectedFont && selectedFont.fontName === font.fontName }"
      :style="{ backgroundImage: `url(${font.image})` }"
      @click="selectFont(font)"
    />
  </div>
</template>

<style lang="scss" scoped>
.buttons-selection {
  display: flex;
  flex-direction: column;
  margin: 1rem;

  button {
      width: 200px;
  }
  
  &.mobile {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    margin: 0;
    width: 100%;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: thin; /* Firefox */
    
    /* Webkit scrollbar styling */
    &::-webkit-scrollbar {
      height: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }

    button {
      width: 75px;
      flex-shrink: 0;
      min-width: 75px; /* Ensure minimum width */
    }
  }
}

  button {
      margin: 0.25rem 0;
      background-size: contain;
      background-repeat: no-repeat;      
      background-position: center;
      cursor: pointer;
      height: 45px;
      border-radius: 6px;
  }

button.active {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
