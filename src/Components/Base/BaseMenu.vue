<template>
  <li
    @click="menuClick(index + 1)"
    class="w-fit m-auto px-2 my-2"
    :class="[isActive === index + 1 ? [color, 'text-white'] : '']"
  >
    &lt{{ menuItem }}&gt
  </li>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu.js';
import { useBaseStore } from '@/stores/base.js';

const menu = useMenuStore();
const base = useBaseStore();

const props = defineProps({
  menuItem: String,
  index: Number,
  isActive: Number,
  color: String
});

const menuClick = (index) => {
  if (base.stopActiveWindow && base.confirmWindow) return menu.confirmMenuClick(index);
  
  switch (base.activeWindow) {
    case 'main':
      menu.mainMenuClick(index);
      break;
    case 'secondary':
      menu.secondaryMenuClick(index);
      break;
    case 'add':
      menu.addMenuClick(index);
      break;
  }
};
</script>
