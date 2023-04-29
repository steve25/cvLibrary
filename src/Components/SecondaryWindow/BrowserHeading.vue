<template>
  <tr class="border-b-4 border-double border-gray-400">
    <th scope="col" class="px-2 py-1 border-r-2 border-gray-400">{{ headingValues[0] }}</th>
    <th scope="col" class="px-2 py-1">{{ headingValues[1] }}</th>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import { useMenuStore } from '@/stores/useMenu.js';

const baseMenu = useMenuStore();

const headingValues = computed(() => {
  if (baseMenu.isActiveMain === 1) {
    return ['User id', 'Book id'];
  } else if (baseMenu.isActiveMain === 2) {
    return ['Lastname', 'Firstname'];
  } else {
    return ['Title', 'Author'];
  }
});
</script>
