<template>
  <header>
    <div class="wrapper">
      <img src="../../assets/images/opossum.png" alt="Opossum logo" class="opossum-logo opossum-logo-left" />
      <div class="header-center">
        <h1>Opawesome</h1>
        <div class="share-text">
          Share creations on Pixelfed with <a class="hashtag" href="https://pixelfed.social/discover/tags/opawesome?src=hash" target="_blank" rel="noopener noreferrer">#opawesome</a>!
        </div>
      </div>
      <img src="../../assets/images/opossum.png" alt="Opossum logo" class="opossum-logo opossum-logo-right" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 8vh;
  font-family: 'Opossum Regular', sans-serif;
  gap: 3rem;
  color: var(--bistre);
  text-align: center;
  background: var(--smoky-black);

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;
  }

  .header-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .opossum-logo {
    width: 8vh;
  }

  h1 {
    all: unset;
    color: antiquewhite;
    font-size: 2em;
    margin: 0;
  }

  .share-text {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.2;

    a {
      color: #90caf9;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }

    .hashtag {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  .opossum-logo-right {
    transform: rotateY(180deg);
  }
}

@media (max-height: 865px) {
  .opossum-logo {
    display: none;
  }

  header {
    .share-text {
      padding: 0 1rem;
    }
    
    h1 {
      font-size: 1.5em;
    }
  }
}
</style>
