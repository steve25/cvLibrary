<template>
  <div
    class="h-screen flex items-center justify-center outline-none cursor-default tracking-widest"
  >
    <div class="border-4 border-slate-500">
      <main class="w-[640px] h-[480px] bg-blue-800 border border-black">
        <div class="h-full flex flex-col items-center justify-around text-white">
          <base-title title="Simple Library" text-size="text-3xl" />
          <ul class="text-base border-2 border-slate-200 p-4">
            <base-menu
              v-for="(mainMenuItem, index) in baseMenu.mainMenuItems"
              :key="mainMenuItem"
              :menuItem="mainMenuItem"
              :index="index"
              :isActive="baseMenu.isActiveMain"
              color="bg-orange-800"
            />
          </ul>
          <div class="text-yellow-400 text-center text-xs">
            <p>up / down key - move</p>
            <p>enter - select</p>
          </div>
        </div>
      </main>
      <add-items />
      <secondary-window />
      <base-dialog />
      <base-confirm />
      <quit-window />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useMenuStore } from '@/stores/useMenu.js';
import { useBaseStore } from '@/stores/useBase.js';

import BaseMenu from '../Components/Base/BaseMenu.vue';
import BaseTitle from '../Components/Base/BaseTitle.vue';
import SecondaryWindow from './SecondaryWindow.vue';
import AddItems from '../Components/SecondaryWindow/AddItems.vue';
import BaseDialog from '../Components/Base/BaseDialog.vue';
import BaseConfirm from '../Components/Base/BaseConfirm.vue';
import QuitWindow from './QuitWindow.vue';

const baseMenu = useMenuStore();
const baseStore = useBaseStore();

onMounted(() => {
  window.addEventListener('keyup', keyPress);
  window.addEventListener(
    'keydown',
    function (e) {
      if (['ArrowUp', 'ArrowDown', 'F4'].indexOf(e.code) > -1) {
        e.preventDefault();
      }
    },
    false
  );
}),
  onUnmounted(() => {
    window.removeEventListener('keyup', keyPress);
    window.removeEventListener(
      'keydown',
      function (e) {
        if (['ArrowUp', 'ArrowDown', 'F4'].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  });

// keypress
let keyPress = (e) => {
  switch (baseStore.activeWindow) {
    case 'main':
      baseMenu.mainKeyControl(e);
      break;
    case 'secondary':
      baseMenu.secondaryKeyControl(e);
      break;
    case 'add':
      baseMenu.addKeyControl(e);
      break;
    case 'quit':
      baseMenu.quitKeyControl(e);
      break;
  }

  if (baseStore.confirmWindow) {
    baseMenu.confirmKeyControl(e);
  }
};
</script>
