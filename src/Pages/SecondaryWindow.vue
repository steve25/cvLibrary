<template>
  <dialog
    v-if="base.activeWindow === 'secondary'"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="w-[600px] p-4 bg-blue-800 shadow-xl text-gray-200 border border-white cursor-default"
    >
      <div class="text-center mb-4">
        <base-title :title="base.activeMainTitle" text-size="text-2xl" />
      </div>

      <div class="flex justify-around">
        <div
          class="bg-gray-400 px-2 py-4 border-4"
          :class="[base.activeNavigation === 'browser' ? 'border-red-600' : 'border-gray-400']"
        >
          <div class="h-56 w-96 relative overflow-auto bg-cyan-500">
            <the-browser />
          </div>
        </div>
        <div class="ml-6">
          <ul
            class="text-base border-2 p-4"
            :class="[base.activeNavigation === 'menu' ? 'border-red-600' : 'border-slate-200']"
          >
          <template v-if="menu.activeMainItem === 1">
            <base-menu
            v-for="(secondaryMenuItem, index) in menu.secondaryBorrowsMenuItems"
            :key="secondaryMenuItem"
            :menuItem="secondaryMenuItem"
            :index="index"
            :isActive="menu.activeSecondaryItem"
            color="bg-orange-800"
            />
          </template>
          <template v-else>
            <base-menu
            v-for="(secondaryMenuItem, index) in menu.secondaryMenuItems"
            :key="secondaryMenuItem"
            :menuItem="secondaryMenuItem"
            :index="index"
            :isActive="menu.activeSecondaryItem"
            color="bg-orange-800"
            />
          </template>
          </ul>
        </div>
      </div>
      <div class="mt-5 text-xs text-white text-center">
        <p>up / down key - move</p>
        <p>F4 - change between menu and browser</p>
        <p>enter - select</p>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import BaseMenu from '../Components/Base/BaseMenu.vue';
import BaseTitle from '../Components/Base/BaseTitle.vue';
import TheBrowser from '../Components/SecondaryWindow/TheBrowser.vue';

import { useMenuStore } from '@/stores/menu.js';
import { useBaseStore } from '@/stores/base.js';

const menu = useMenuStore();
const base = useBaseStore();
</script>
