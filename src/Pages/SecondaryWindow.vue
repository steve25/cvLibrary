<template>
  <dialog
    v-if="menu.activeWindow === 'secondary'"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="w-[600px] p-6 bg-blue-800 shadow-xl text-gray-200 border border-white cursor-default"
    >
      <div class="text-center mb-6">
        <base-title :title="activeTitle" text-size="text-2xl"/>
      </div>
      <ul class="text-base border-2 border-slate-200 p-4">
        <base-menu
          v-for="(secondaryMenuItem, index) in menu.secondaryMenuItems"
          :key="secondaryMenuItem"
          :menuItem="secondaryMenuItem"
          :index="index"
          :isActive="menu.isActiveSecondary"
        />
      </ul>
      <div class="mt-5 text-sm text-white text-center">
        <p>up down key - move, left right key - change between menu and browser, enter - select</p>
      </div>
    </div>
  </dialog>
</template>

<script>
import BaseMenu from '../Components/Base/BaseMenu.vue';
import BaseTitle from '../Components/Base/BaseTitle.vue';

import { useMenuStore } from '@/stores/menu.js';
import { computed } from 'vue';

export default {
  components: {
    BaseMenu,
    BaseTitle
  },
  props: {
    isSecondaryWindowOpen: Boolean,
    isActiveSecondary: Number,
    secondaryMenuItems: Array
  },

  setup(props) {
    const menu = useMenuStore();

    const activeTitle = computed(() => {
      if (menu.isActiveMain === 1) {
        return 'Borrows';
      } else if (menu.isActiveMain === 2) {
        return 'Users';
      } else {
        return 'Books';
      }
    });

    return { menu, activeTitle };
  }
};
</script>
