<template>
  <Teleport to="body">
    <dialog
      v-if="base.confirmWindow"
      class="absolute top-0 right-0 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div
        class="w-[450px] p-6 bg-red-700 text-gray-200 border-double border-4 border-yellow-300 cursor-default"
      >
        <div class="text-center">
          <base-title :title="base.activeSecondaryTitle" text-size="text-2xl" />
        </div>
        <div class="p-4 flex justify-around items-center">
          <div class="p-4">You realy wan`t delete this item?</div>
          <div class="px-4 py-2 border border-yellow-300">
            <ul class="text-center">
              <base-menu
                v-for="(confirmMenuItem, index) in menu.confirmMenuItems"
                :key="confirmMenuItem"
                :menuItem="confirmMenuItem"
                :index="index"
                :isActive="menu.activeConfirmIttem"
                color="bg-black"
              />
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
import BaseMenu from './BaseMenu.vue';
import BaseTitle from './BaseTitle.vue';

import { useBaseStore } from '@/stores/base.js';
import { useMenuStore } from '@/stores/menu.js';

const base = useBaseStore();
const menu = useMenuStore();
</script>
