import { defineStore } from 'pinia';
import { useMenuStore } from './useMenu.js';

export const useBaseStore = defineStore('baseStore', {
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
      if (useMenuStore().isActiveMain === 1) return 'Borrows';
      if (useMenuStore().isActiveMain === 2) return 'Users';
      return 'Books';
    },
    activeSecondaryTitle() {
      if (useMenuStore().isActiveSecondary === 1) return 'Add';
      if (useMenuStore().isActiveSecondary === 2) return 'Edit';
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
      useBaseStore().browserWindowRef[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
});
