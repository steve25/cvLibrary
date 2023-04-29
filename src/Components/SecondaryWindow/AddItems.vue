<template>
  <Teleport to="body">
    <dialog
      v-if="baseStore.activeWindow === 'add'"
      class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div
        class="w-[600px] p-6 bg-blue-800 shadow-xl text-gray-200 border border-white cursor-default"
      >
        <div class="text-center mb-4">
          <base-title :title="baseStore.activeSecondaryTitle" text-size="text-2xl" />
        </div>

        <div class="flex justify-around">
          <div class="px-2 py-4 border-4">
            <div class="h-28 w-96 p-2 relative overflow-auto">
              <div class="p-2">
                <label for="firstItemInput" class="p-4">{{ addWindowTexts[0] }}</label>
                <input
                  ref="firstInputRef"
                  type="text"
                  id="firstItemInput"
                  class="w-56 text-zinc-800"
                  v-model="baseStore.firstItemInput"
                />
              </div>
              <div class="p-2">
                <label for="secondItemInput" class="p-4">{{ addWindowTexts[1] }}</label>
                <input
                  type="text"
                  id="secondItemInput"
                  class="w-56 text-zinc-800"
                  v-model="baseStore.secondItemInput"
                />
              </div>
            </div>
          </div>
          <div class="ml-6">
            <ul class="text-base border-2 p-4">
              <base-menu
                v-for="(secondaryMenuItem, index) in baseMenu.addMenuItems"
                :key="secondaryMenuItem"
                :menuItem="secondaryMenuItem"
                :index="index"
                :isActive="baseMenu.isActiveAdd"
                color="bg-orange-800"
              />
            </ul>
          </div>
        </div>
        <div class="mt-5 text-xs text-white text-center">
          <p>up down key - move</p>
          <p>enter - select</p>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
import BaseTitle from '../Base/BaseTitle.vue';
import BaseMenu from '../Base/BaseMenu.vue';

import { useBaseStore } from '@/stores/useBase.js';
import { useMenuStore } from '@/stores/useMenu.js';
import { useUsersStore } from '@/stores/useUsers.js';

import { ref, watch, computed } from 'vue';

const baseStore = useBaseStore();
const baseMenu = useMenuStore();
const baseUsers = useUsersStore();

const firstInputRef = ref(null);

watch(
  () => baseStore.activeWindow,
  () => {
    if (baseStore.activeWindow === 'add') {
      setTimeout(() => {
        firstInputRef.value.focus();
      }, 0);
    }
  }
);

const addWindowTexts = computed(() => {
  if (useMenuStore().isActiveMain === 1) {
    return ['User ID', 'Book ID'];
  } else if (useMenuStore().isActiveMain === 2) {
    return ['Lastname', 'Firstname'];
  } else {
    return ['Title', 'Author'];
  }
});
</script>
