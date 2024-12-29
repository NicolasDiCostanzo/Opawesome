<script setup>
import { LEFT_PART_TEXT } from '../../constants/texts';

const handleAddClick = () => {
  console.log('Add button clicked');
};
</script>

<template>
  <div class="left-part">
    <span id="wrapper">
      <p>{{ LEFT_PART_TEXT }}</p>
      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <button @click=handleAddClick()>Add</button>
    </span>
  </div>
</template>

<style lang="scss">
.left-part {
  display: flex;
  justify-content: center;
}

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2rem;
}
</style>
