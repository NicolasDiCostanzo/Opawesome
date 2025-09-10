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
        
        <div class="social-links">
            <a href="https://pixelfed.social/Majellan" target="_blank" rel="noopener noreferrer" class="social-link">
                <img src="../../assets/images/pixelfed.png" alt="Pixelfed" class="social-logo">
            </a>
            <a href="mailto:opawesome@disroot.org" class="social-link">
                <img src="../../assets/images/mail.png" alt="Email" class="social-logo">
            </a>
            <a href="https://github.com/NicolasDiCostanzo/Opawesome" target="_blank" rel="noopener noreferrer" class="social-link">
                <img src="../../assets/images/github.png" alt="GitHub" class="social-logo">
            </a>
        </div>
    </footer>
    <ContactDialog v-if="isContactDialogOpen" @close="isContactDialogOpen = false"/>
</template>

<style scoped lang="scss">
.common-footer {
  height: 7vh;
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &.mobile {
    height: 5vh;
  }
}

button {
    all: unset;
    cursor: pointer;
    position: relative;
    transition: color 0.2s ease;
    color: white;

    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 1px;
        background: currentColor;
        opacity: 0.3;
        transition: opacity 0.2s ease;
    }

    &:hover {
        color: rgba(255, 255, 255, 0.9);
        
        &::after {
            opacity: 0.8;
        }
    }
}

.social-links {
  position: absolute;
  right: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  .social-link {
    display: inline-block;
    transition: transform 0.2s ease, filter 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      filter: brightness(1.2);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .social-logo {
    width: 24px;
    height: 24px;
    filter: brightness(0.8);
    transition: filter 0.2s ease;
  }
}

// Mobile adjustments
@media (max-width: 768px) {
  .social-links {
    right: 1rem;
    gap: 0.75rem;

    .social-logo {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
