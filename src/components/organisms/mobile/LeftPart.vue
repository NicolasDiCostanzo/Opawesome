<script setup>
import FontButtonsSelection from '../../molecules/FontButtonsSelection.vue';
import { ADD_BUTTON_TEXT } from '../../../constants/labels';
import useLeftPartLogic from '../../../composables/useLeftPartLogic';

const props = defineProps(['canvas', 'font']);
const emit = defineEmits(['update:font']);

// eslint-disable-next-line no-unused-vars
const { selectedFont, handleFontUpdate, addTextOnCanvas } = useLeftPartLogic(props, emit);
</script>

<template>
  <div class="mobile-left">
    <div class="mobile-controls">
      <FontButtonsSelection :font="font" @update:font="handleFontUpdate" />
      <button @click="addTextOnCanvas" class="mobile-add-btn">
          {{ ADD_BUTTON_TEXT }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-left {
  background-color: var(--coyote);
  padding: 1rem;
}

.mobile-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
}

.mobile-add-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
