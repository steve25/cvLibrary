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
              v-for="(mainMenuItem, index) in menu.mainMenuItems"
              :key="mainMenuItem"
              :menuItem="mainMenuItem"
              :index="index"
              :isActive="menu.activeMainItem"
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
import { useMenuStore } from '@/stores/menu.js';
import { useBaseStore } from '@/stores/base.js';

import BaseMenu from '../Components/Base/BaseMenu.vue';
import BaseTitle from '../Components/Base/BaseTitle.vue';
import SecondaryWindow from './SecondaryWindow.vue';
import AddItems from '../Components/SecondaryWindow/AddItems.vue';
import BaseDialog from '../Components/Base/BaseDialog.vue';
import BaseConfirm from '../Components/Base/BaseConfirm.vue';
import QuitWindow from './QuitWindow.vue';

const menu = useMenuStore();
const base = useBaseStore();

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
  switch (base.activeWindow) {
    case 'main':
      menu.mainKeyControl(e);
      break;
    case 'secondary':
      menu.secondaryKeyControl(e);
      break;
    case 'add':
      menu.addKeyControl(e);
      break;
    case 'quit':
      menu.quitKeyControl(e);
      break;
  }

  if (base.confirmWindow) menu.confirmKeyControl(e);
};
</script>
