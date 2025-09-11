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
  <div class="desktop-left">
    <div class="desktop-wrapper">
      <FontButtonsSelection :font="font" @update:font="handleFontUpdate" />
      <button @click="addTextOnCanvas" class="desktop-add-btn">
        {{ ADD_BUTTON_TEXT }}
      </button>
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

.desktop-add-btn {
  min-width: 200px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}
</style>
