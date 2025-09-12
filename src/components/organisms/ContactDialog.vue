<script setup>
const emit = defineEmits(['close']);

const openEmail = (event) => {
  event.preventDefault();
  window.open('mailto:majellan@disroot.org', '_blank');
};
</script>

<template>
  <div class="contact-dialog-overlay" @click="emit('close')">
    <div class="contact-dialog" @click.stop>
      <div class="dialog-content">
        <div class="contact-text">
          <p>
            <img src="../../assets/images/pixelfed.png" alt="Pixelfed logo" class="social-icon"> You can follow me on
            Pixelfed (I don't follow back, sorry)
            <a href="https://pixelfed.social/Majellan" target="_blank" rel="noopener noreferrer">@Majellan</a>.
          </p>
          <br />
          <p>
            <img src="../../assets/images/mail.png" alt="Email logo" class="social-icon">
            If you have any questions, suggestions or issues, or if you would like to make a declaration of love or
            hate, please feel free to reach out to me at <a href="#" @click="openEmail">majellan@disroot.org</a>.
          </p>
          <br />
          <p>
            <img src="../../assets/images/github.png" alt="GitHub logo" class="social-icon"
              style="vertical-align: middle;" />
            If you'd like to get involved, feel free to contribute to the
            <a href="https://github.com/NicolasDiCostanzo/Opawesome" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
          </p>
          <br />
        </div>

        <div class="action-buttons">
          <button class="primary-button" @click="emit('close')">
            👍 Cool story bro 👍
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../constants/style/constants.scss' as *;

.contact-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.contact-dialog {
  background: linear-gradient(135deg,
      rgba(47, 57, 48, 0.95) 0%,
      rgba(63, 79, 68, 0.9) 50%,
      rgba(20, 26, 21, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(antiquewhite, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(204, 111, 85, 0.1);

  color: antiquewhite;
  font-family: 'Opossum Regular', sans-serif;
}

.dialog-content {
  margin-top: 1rem;
}

.contact-text {
  margin-bottom: 2rem;

  p {
    line-height: 1.6;
    color: rgba(antiquewhite, 0.9);
    font-size: 1em;
    margin: 0;
    text-align: justify;
  }

  a {
    color: var(--tea-rose-red);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    border-bottom: 1px solid transparent;
    text-decoration: underline;

    &:hover {
      color: antiquewhite;
      border-bottom-color: var(--tea-rose-red);
    }
  }

  .social-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    margin-right: 0.5em;
    filter: brightness(0.9);
    transition: filter 0.2s ease;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.primary-button {
  background: linear-gradient(135deg, var(--tea-rose-red), rgba(204, 111, 85, 0.8));
  color: antiquewhite;
  border: 1px solid rgba(antiquewhite, 0.3);
  border-radius: 15px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(204, 111, 85, 0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(204, 111, 85, 0.9), var(--tea-rose-red));
    box-shadow: 0 6px 20px rgba(204, 111, 85, 0.4);
    transform: translateY(-1.5px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(204, 111, 85, 0.3);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .contact-dialog {
    margin: 1rem;
    padding: 1.5rem;
    max-height: 90vh;
  }

  .contact-text p {
    font-size: 14px;
  }
}
</style>
