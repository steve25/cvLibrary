<template>
  <li
    @click="click(index + 1)"
    class="w-fit m-auto px-2 my-2"
    :class="[isActive === index + 1 ? [color, 'text-white'] : '']"
  >
    &lt{{ menuItem }}&gt
  </li>
</template>

<script setup>
const props = defineProps({
  menuItem: String,
  index: Number,
  isActive: Number,
  color: String
});
</script>
