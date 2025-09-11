<script setup>
import FontButtonsSelection from '../../molecules/FontButtonsSelection.vue';
import { ADD_BUTTON_TEXT, DELETE_BUTTON_TEXT } from '../../../constants/labels';
import useLeftPartLogic from '../../../composables/useLeftPartLogic';

const props = defineProps(['canvas', 'font']);
const emit = defineEmits(['update:font']);

const {
  handleFontUpdate, addTextOnCanvas, deleteSelectedText, hasSelectedTextBox,
} = useLeftPartLogic(props, emit);
</script>

<template>
  <div class="mobile-left">
    <div class="mobile-controls">
      <FontButtonsSelection :font="font" @update:font="handleFontUpdate" />
      <div class="button-group">
        <button @click="addTextOnCanvas" class="mobile-add-btn">
            {{ ADD_BUTTON_TEXT }}
        </button>
        <button 
          @click="deleteSelectedText" 
          class="mobile-delete-btn"
          :disabled="!hasSelectedTextBox"
        >
            {{ DELETE_BUTTON_TEXT }}
        </button>
      </div>
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

.button-group {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
}

.mobile-add-btn, .mobile-delete-btn {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.mobile-add-btn {
  background: rgba(255, 255, 255, 0.1);
  color: antiquewhite;
  border: 1px solid rgba(antiquewhite, 0.4);
}

.mobile-delete-btn {
  background: rgba(204, 111, 85, 0.8);
  color: antiquewhite;
  border: 1px solid rgba(204, 111, 85, 0.6);

  &:hover:not(:disabled) {
    background: rgba(204, 111, 85, 0.9);
  }

  &:disabled {
    background: rgba(204, 111, 85, 0.3);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(204, 111, 85, 0.3);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
</style>
