<template>
  <li
    @click="click(index + 1)"
    class="w-fit m-auto px-2 my-2"
    :class="[isActive === index + 1 ? ['bg-orange-800', 'text-white'] : '']"
  >
    &lt{{ menuItem }}&gt
  </li>
</template>

<script>
export default {
  props: {
    menuItem: String,
    index: Number,
    isActive: Number
  }
};
</script>
