import { defineStore } from 'pinia';
import { useBaseStore } from './base.js';
import { useUsersStore } from './users.js';
import { useBooksStore } from './books.js';
import { useBorrowsStore } from './borrows.js';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      mainMenuItems: ['Borrows', 'Users', 'Books', 'Quit'],
      secondaryMenuItems: ['Add', 'Edit', 'Delete', 'Close'],
      secondaryBorrowsMenuItems: ['New', 'Open', 'Close'],
      addMenuItems: ['Save', 'Cancel'],
      confirmMenuItems: ['Delete', 'Cancel'],
      activeMainItem: 1,
      activeSecondaryItem: 1,
      activeBrowserItem: 1,
      activeAddIttem: 1,
      activeConfirmIttem: 1
    };
  },
  getters: {
    getDataItemsLength(state) {
      if (state.activeMainItem === 1 && useBorrowsStore().borrows)
        return Object.keys(useBorrowsStore().borrows).length;
      if (state.activeMainItem === 2 && useUsersStore().users)
        return Object.keys(useUsersStore().users).length;
      if (state.activeMainItem === 3 && useBooksStore().books)
        return Object.keys(useBooksStore().books).length;
      return 0;
    }
  },
  actions: {
    mainKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('activeMainItem', this.mainMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('activeMainItem', this.mainMenuItems);
          break;
        // enter
        case 13:
          this.mainKeyEnter();
          break;
      }
    },
    mainKeyEnter() {
      if (this.activeMainItem !== 4) return (useBaseStore().activeWindow = 'secondary');
      (this.activeMainItem = 1), (this.activeSecondaryItem = 1);
      useBaseStore().activeWindow = 'quit';
    },
    mainMenuClick(index) {
      switch (index) {
        case 1:
          this.activeMainItem = 1;
          break;
        case 2:
          this.activeMainItem = 2;
          break;
        case 3:
          this.activeMainItem = 3;
          break;
        case 4:
          this.activeMainItem = 4;
          break;
      }
      this.mainKeyEnter();
    },

    //keypress in secondary window
    secondaryKeyControl(e) {
      if (useBaseStore().stopActiveWindow) return;
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.secondaryKeyUp();
          break;
        // key arrow down
        case 40:
          this.secondaryKeyDown();
          break;
        case 115:
          this.menuBrowserToggle();
          break;
        case 13:
          this.secondaryKeyEnter();
          break;
      }
    },
    // secondary window controls
    secondaryKeyUp() {
      // menu
      if (useBaseStore().activeNavigation === 'menu' && this.activeMainItem === 1)
        return this.menuKeyUp('activeSecondaryItem', this.secondaryBorrowsMenuItems);
      if (useBaseStore().activeNavigation === 'menu' && this.activeMainItem !== 1)
        return this.menuKeyUp('activeSecondaryItem', this.secondaryMenuItems);
      // browser
      this.browserKeyUp();
    },
    secondaryKeyDown() {
      // menu
      if (useBaseStore().activeNavigation === 'menu' && this.activeMainItem === 1)
        return this.menuKeyDown('activeSecondaryItem', this.secondaryBorrowsMenuItems);
      if (useBaseStore().activeNavigation === 'menu' && this.activeMainItem !== 1)
        return this.menuKeyDown('activeSecondaryItem', this.secondaryMenuItems);
      // browser
      this.browserKeyDown();
    },
    menuBrowserToggle() {
      // change between menu and browser
      if (useBaseStore().activeNavigation === 'menu')
        return (useBaseStore().activeNavigation = 'browser');
      return (useBaseStore().activeNavigation = 'menu');
    },
    secondaryKeyEnter() {
      // enter
      switch (this.activeSecondaryItem) {
        // add
        case 1:
          useBaseStore().activeWindow = 'add';
          break;
        // edit
        case 2:
          if (this.getDataItemsLength === 0) return useBaseStore().showDialog('No item selected');
          useBaseStore().firstItemInput =
            useBaseStore().browserFirstItemRef[this.activeBrowserItem].innerText;
          useBaseStore().secondItemInput =
            useBaseStore().browserSecondItemRef[this.activeBrowserItem].innerText;
          useBaseStore().activeWindow = 'add';
          break;
        // delete
        case 3:
          if (this.activeMainItem === 1) return (this.activeSecondaryItem = 4), (this.secondaryKeyEnter());
          if (this.getDataItemsLength === 0) return useBaseStore().showDialog('No item selected');
          useBaseStore().stopActiveWindow = true;
          setTimeout(() => {
            useBaseStore().confirmWindow = true;
          }, 10);
          break;
        // close
        case 4:
          (this.activeMainItem = 1), (this.activeSecondaryItem = 1), (this.activeBrowserItem = 1);
          useBaseStore().activeWindow = 'main';
          break;
      }
    },
    secondaryMenuClick(index) {
      switch (index) {
        case 1:
          this.activeSecondaryItem = 1;
          break;
        case 2:
          this.activeSecondaryItem = 2;
          break;
        case 3:
          this.activeSecondaryItem = 3;
          break;
        case 4:
          this.activeSecondaryItem = 4;
          break;
      }
      if (useBaseStore().activeNavigation !== 'menu') useBaseStore().activeNavigation = 'menu';
      this.secondaryKeyEnter();
    },
    // add window key controll
    addKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('activeAddIttem', this.addMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('activeAddIttem', this.addMenuItems);
          break;
        // enter
        case 13:
          this.addKeyEnter();
          break;
      }
    },
    addKeyEnter() {
      switch (this.activeAddIttem) {
        // save
        case 1:
          if (useBaseStore().firstItemInput === '' || useBaseStore().secondItemInput === '')
            return useBaseStore().showDialog('All fields required');

          if (this.activeMainItem === 2 && this.activeSecondaryItem === 1)
            useUsersStore().addNewUser();
          if (this.activeMainItem === 2 && this.activeSecondaryItem === 2)
            useUsersStore().editNewUser();
          if (this.activeMainItem === 3 && this.activeSecondaryItem === 1)
            useBooksStore().addNewBook();
          if (this.activeMainItem === 3 && this.activeSecondaryItem === 2)
            useBooksStore().editNewBook();
          useBaseStore().firstItemInput = '';
          useBaseStore().secondItemInput = '';
          this.activeAddIttem = 1;
          useBaseStore().activeWindow = 'secondary';
          break;
        // cancel
        case 2:
          this.activeAddIttem = 1;
          useBaseStore().activeWindow = 'secondary';
          break;
      }
    },
    addMenuClick(index) {
      switch (index) {
        case 1:
          this.activeAddIttem = 1;
          break;
        case 2:
          this.activeAddIttem = 2;
          break;
      }
      this.addKeyEnter();
    },
    confirmKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('activeConfirmIttem', this.confirmMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('activeConfirmIttem', this.confirmMenuItems);
          break;
        // enter
        case 13:
          this.confirmKeyEnter();
      }
    },
    confirmKeyEnter() {
      switch (this.activeConfirmIttem) {
        case 1:
          if (this.activeMainItem === 2) useUsersStore().deleteUser();
          if (this.activeMainItem === 3) useBooksStore().deleteBook();
          break;
      }
      this.activeConfirmIttem = 1;
      useBaseStore().confirmWindow = false;
      useBaseStore().stopActiveWindow = false;
    },
    confirmMenuClick(index) {
      this.activeConfirmIttem = index;
      this.confirmKeyEnter();
    },
    //keypress quit window
    quitKeyControl(e) {
      if (e.keyCode === 13) return (useBaseStore().activeWindow = 'main');
    },
    menuKeyUp(activeItem, menuItems) {
      if (eval('this.' + activeItem + '=== 1'))
        return eval('this.' + activeItem + '=' + menuItems.length);
      return eval('this.' + activeItem + '--');
    },
    menuKeyDown(activeItem, menuItems) {
      if (eval('this.' + activeItem + '===' + menuItems.length))
        return eval('this.' + activeItem + '= 1');
      return eval('this.' + activeItem + '++');
    },
    browserKeyUp() {
      if (this.getDataItemsLength === 0) return;
      if (this.activeBrowserItem === 1) {
        this.activeBrowserItem = this.getDataItemsLength;
      } else {
        this.activeBrowserItem--;
      }
      useBaseStore().focusBrowserWindow(this.activeBrowserItem);
    },
    browserKeyDown() {
      if (this.getDataItemsLength === 0) return;
      if (this.activeBrowserItem === this.getDataItemsLength) {
        this.activeBrowserItem = 1;
      } else {
        this.activeBrowserItem++;
      }
      useBaseStore().focusBrowserWindow(this.activeBrowserItem);
    }
  }
});
