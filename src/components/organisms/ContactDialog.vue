<script setup>
const emit = defineEmits(['close']);
</script>

<template>
    <div class="contact-dialog">
      <button @click="emit('close')">X</button>
      <h2>Contact Us</h2>
    </div>
</template>

<style scoped lang="scss">
@use '../../constants/style/constants.scss' as *;

.contact-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dialog-background);
  color: var(--dialog-text);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1rem;
  }

  button {
    all: unset;
    cursor: pointer;

    &:hover {
      all: unset;
      text-decoration: underline;
    }
  }
}
</style>
