<script setup>
import useMobileState from '../../composables/useMobileState';
import { CONTACT_BUTTON_TEXT } from '../../constants/labels';

const { isMobile } = useMobileState();
</script>

<template>
    <footer class="common-footer" :class="{ 'mobile': isMobile }">
        <button>{{ CONTACT_BUTTON_TEXT }}</button>
    </footer>
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
