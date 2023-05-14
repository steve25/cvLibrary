<template>
  <tr class="border-b-4 border-double border-gray-400">
    <th scope="col" class="px-2 py-1 border-r-2 border-gray-400">{{ headingValues[0] }}</th>
    <th scope="col" class="px-2 py-1">{{ headingValues[1] }}</th>
  </tr>
</template>

<script setup>
import { computed } from 'vue';
import { useMenuStore } from '@/stores/menu.js';

const menu = useMenuStore();

const headingValues = computed(() => {
  if (menu.activeMainItem === 1) return ['Id', 'Username'];
  if (menu.activeMainItem === 2) return ['Lastname', 'Firstname'];
  return ['Title', 'Author'];
});
</script>
