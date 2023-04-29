<template>
  <dialog
    v-if="baseStore.activeWindow === 'secondary'"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="w-[600px] p-4 bg-blue-800 shadow-xl text-gray-200 border border-white cursor-default"
    >
      <div class="text-center mb-4">
        <base-title :title="baseStore.activeMainTitle" text-size="text-2xl" />
        {{ baseStore.browserWindowRef.length }}
      </div>

      <div class="flex justify-around">
        <div
          class="bg-gray-400 px-2 py-4 border-4"
          :class="[baseStore.activeNavigation === 'browser' ? 'border-red-600' : 'border-gray-400']"
        >
          <div class="h-56 w-96 relative overflow-auto bg-cyan-500">
            <the-browser />
          </div>
        </div>
        <div class="ml-6">
          <ul
            class="text-base border-2 p-4"
            :class="[baseStore.activeNavigation === 'menu' ? 'border-red-600' : 'border-slate-200']"
          >
            <base-menu
              v-for="(secondaryMenuItem, index) in baseMenu.secondaryMenuItems"
              :key="secondaryMenuItem"
              :menuItem="secondaryMenuItem"
              :index="index"
              :isActive="baseMenu.isActiveSecondary"
              color="bg-orange-800"
            />
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

import { useMenuStore } from '@/stores/useMenu.js';
import { useBaseStore } from '@/stores/useBase.js';
import { useUsersStore } from '@/stores/useUsers.js';

const baseMenu = useMenuStore();
const baseStore = useBaseStore();
</script>
