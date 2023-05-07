import { defineStore } from 'pinia';
import { useMenuStore } from './menu.js';

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      activeWindow: 'main',
      dialogWindow: false,
      dialogText: '',
      confirmWindow: false,
      activeNavigation: 'menu',
      browserWindowRef: [],
      browserFirstItemRef: [],
      browserSecondItemRef: [],
      firstItemInput: '',
      secondItemInput: '',
      dataLength: null,
      stopActiveWindow: false,
    };
  },
  getters: {
    activeMainTitle() {
      if (useMenuStore().activeMainItem === 1) return 'Borrows';
      if (useMenuStore().activeMainItem === 2) return 'Users';
      return 'Books';
    },
    activeSecondaryTitle() {
      if (useMenuStore().activeSecondaryItem === 1) return 'Add';
      if (useMenuStore().activeSecondaryItem === 2) return 'Edit';
      return 'Delete';
    }
  },
  actions: {
    showDialog(text) {
      this.dialogWindow = true;
      this.dialogText = text;
      setTimeout(() => {
        this.dialogWindow = false;
        this.dialogText = '';
      }, 2000);
    },
    focusBrowserWindow(index) {
      this.browserWindowRef[index-1].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
});
