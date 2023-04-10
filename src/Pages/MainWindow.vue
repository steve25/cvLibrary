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
              :isActive="menu.isActiveMain"
            />
          </ul>
          <div class="text-yellow-400 text-center">
            <p>up down key - move</p>
            <p>enter - select</p>
          </div>
        </div>
      </main>
      <secondary-window />
      <quit-window />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted } from 'vue';
import { useMenuStore } from '@/stores/menu.js';

import BaseMenu from '../Components/Base/BaseMenu.vue';
import BaseTitle from '../Components/Base/BaseTitle.vue';
import SecondaryWindow from './SecondaryWindow.vue';
import QuitWindow from './QuitWindow.vue';

export default {
  components: {
    BaseMenu,
    BaseTitle,
    SecondaryWindow,
    QuitWindow
  },
  setup() {
    const menu = useMenuStore();

    const state = reactive({});

    onMounted(() => {
      window.addEventListener('keyup', keyPress);
      window.addEventListener(
        'keydown',
        function (e) {
          if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
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
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
              e.preventDefault();
            }
          },
          false
        );
      });

    // keypress
    let keyPress = (e) => {
      switch (menu.activeWindow) {
        case 'main':
          menu.mainKeyControl(e);
          break;
        case 'secondary':
          menu.secondaryKeyControl(e);
          break;
        case 'quit':
          menu.quitKeyControl(e);
          break;
      }
    };

    return {
      menu,
      ...toRefs(state),
      keyPress
    };
  }
};
</script>
