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
      <FontButtonsSelection @update:font="handleFontUpdate" />
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
  border-radius: 8px 8px 0 0;
}

.mobile-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.mobile-add-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  color: #333;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}
</style>
