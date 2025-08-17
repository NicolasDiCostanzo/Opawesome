<template>
    <header>
      <div class="wrapper">
        <img src="../../assets/images/opossum.png" alt="Opossum logo" class="opossum-logo opossum-logo-left" />
        <h1>Opawesome</h1>
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
  }

  .opossum-logo {
    width: 8vh;
  }

  h1 {
    all: unset;
    color: antiquewhite;
    font-size: 2em;
  }

  .opossum-logo-right {
    transform: rotateY(180deg);
  }
}
</style>
