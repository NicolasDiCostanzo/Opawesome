<template>
  <div>
    <LeftPart />
    <CenterPart />
    <RightPart />
  </div>
</template>

<script>
import LeftPart from './components/organisms/LeftPart.vue';
import CenterPart from './components/organisms/CenterPart.vue';
import RightPart from './components/organisms/RightPart.vue';

export default {
  name: 'App',
  components: {
    LeftPart,
    CenterPart,
    RightPart
  }
}
</script>

<style>
  div {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

div > :first-child, div > :last-child {
  flex: 1;
}

div > :nth-child(2) {
  flex: 2;
}
</style>
