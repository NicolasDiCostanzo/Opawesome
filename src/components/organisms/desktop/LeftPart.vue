<script setup>
import FontButtonsSelection from '../../molecules/FontButtonsSelection.vue';
import { ADD_BUTTON_TEXT } from '../../../constants/labels';
import useLeftPartLogic from '../../../composables/useLeftPartLogic';

const props = defineProps(['canvas', 'font']);
const emit = defineEmits(['update:font']);

const {
  handleFontUpdate, addTextOnCanvas, hasFontSelected,
} = useLeftPartLogic(props, emit);
</script>

<template>
  <div class="desktop-left">
    <div class="desktop-wrapper">
      <FontButtonsSelection :font="font" @update:font="handleFontUpdate" />
      <div class="button-group">
        <button 
          @click="addTextOnCanvas" 
          class="desktop-add-btn"
          :disabled="!hasFontSelected"
        >
          {{ ADD_BUTTON_TEXT }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../constants/style/select.scss';

.desktop-left {
  display: flex;
  justify-content: center;
  background-color: var(--coyote);
}

.desktop-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 2rem;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;
}

.desktop-add-btn, .desktop-delete-btn {
  min-width: 200px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}

.desktop-delete-btn {
  background: rgba(204, 111, 85, 0.8);
  color: antiquewhite;
  border: 1px solid rgba(204, 111, 85, 0.6);

  &:hover:not(:disabled) {
    background: rgba(204, 111, 85, 0.9);
  }
}
</style>
