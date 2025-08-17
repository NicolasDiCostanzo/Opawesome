<script setup>
import { ref } from 'vue';
import useMobileState from '../../composables/useMobileState';
import { CONTACT_BUTTON_TEXT } from '../../constants/labels';
import ContactDialog from './ContactDialog.vue';

const { isMobile } = useMobileState();
const isContactDialogOpen = ref(false);
</script>

<template>
    <footer class="common-footer" :class="{ 'mobile': isMobile }">
        <button @click="isContactDialogOpen = true">{{ CONTACT_BUTTON_TEXT }}</button>
    </footer>
    <ContactDialog v-if="isContactDialogOpen" @close="isContactDialogOpen = false"/>
</template>

<style scoped lang="scss">
.common-footer {
  height: 10vh;
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);

  display: flex;
  align-items: center;
  justify-content: center;

  &.mobile {
    height: 5vh;
  }
}

button {
    all: unset;
    cursor: pointer;

    &:hover {
        all: unset;
        text-decoration: underline;
    }
}
</style>
