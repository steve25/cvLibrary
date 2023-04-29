import { defineStore } from 'pinia';
import { useBaseStore } from './useBase.js';
import { useUsersStore } from './useUsers.js';
import { useBooksStore } from './useBooks.js';
import { useBorrowsStore } from './useBorrows.js';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      mainMenuItems: ['Borrows', 'Users', 'Books', 'Quit'],
      secondaryMenuItems: ['Add', 'Edit', 'Delete', 'Close'],
      addMenuItems: ['Save', 'Cancel'],
      confirmMenuItems: ['Delete', 'Cancel'],
      isActiveMain: 1,
      isActiveSecondary: 1,
      isActiveBrowser: 1,
      isActiveAdd: 1,
      isActiveConfirm: 1
    };
  },
  getters: {
    getDataItemsLength(state) {
      if (state.isActiveMain === 1 && useBorrowsStore().borrows)
        return Object.keys(useBorrowsStore().borrows).length;
      if (state.isActiveMain === 2 && useUsersStore().users)
        return Object.keys(useUsersStore().users).length;
      if (state.isActiveMain === 3 && useBooksStore().books)
        return Object.keys(useBooksStore().books).length;
      return 0;
    }
  },
  actions: {
    mainKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('isActiveMain', this.mainMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('isActiveMain', this.mainMenuItems);
          break;
        // enter
        case 13:
          this.mainKeyEnter();
          break;
      }
    },
    mainKeyEnter() {
      if (this.isActiveMain !== 4) return (useBaseStore().activeWindow = 'secondary');
      (this.isActiveMain = 1), (this.isActiveSecondary = 1);
      useBaseStore().activeWindow = 'quit';
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
      if (useBaseStore().activeNavigation === 'menu')
        return this.menuKeyUp('isActiveSecondary', this.secondaryMenuItems);
      // browser
      this.browserKeyUp();
    },
    secondaryKeyDown() {
      // menu
      if (useBaseStore().activeNavigation === 'menu')
        return this.menuKeyDown('isActiveSecondary', this.secondaryMenuItems);
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
      switch (this.isActiveSecondary) {
        // add
        case 1:
          useBaseStore().activeWindow = 'add';
          break;
        // edit
        case 2:
          if (this.getDataItemsLength === 0) return useBaseStore().showDialog('No item selected');
          useBaseStore().firstItemInput =
            useBaseStore().browserFirstItemRef[this.isActiveBrowser].innerText;
          useBaseStore().secondItemInput =
            useBaseStore().browserSecondItemRef[this.isActiveBrowser].innerText;
          useBaseStore().activeWindow = 'add';
          break;
        // delete
        case 3:
          if (this.getDataItemsLength === 0) return useBaseStore().showDialog('No item selected');
          useBaseStore().stopActiveWindow = true;
          setTimeout(() => {
            useBaseStore().confirmWindow = true;
          }, 10);
          break;
        // close
        case 4:
          (this.isActiveMain = 1), (this.isActiveSecondary = 1), (this.isActiveBrowser = 1);
          useBaseStore().activeWindow = 'main';
          break;
      }
    },
    // add window key controll
    addKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('isActiveAdd', this.addMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('isActiveAdd', this.addMenuItems);
          break;
        // enter
        case 13:
          this.addKeyEnter();
          break;
      }
    },
    addKeyEnter() {
      switch (this.isActiveAdd) {
        // save
        case 1:
          // save new user
          if (this.isActiveMain === 2) {
            if (useBaseStore().firstItemInput === '' || useBaseStore().secondItemInput === '') {
              useBaseStore().showDialog('All fields required');
              return;
            }
            if (this.isActiveSecondary === 1) {
              useUsersStore().addNewUser();
            } else {
              useUsersStore().editNewUser();
            }
            // edit new user
          } else {
            if (useBaseStore().firstItemInput === '' || useBaseStore().secondItemInput === '') {
              useBaseStore().showDialog('All fields required');
              return;
            }
            if (this.isActiveSecondary === 1) {
              useBooksStore().addNewBook();
            } else {
              useBooksStore().editNewBook();
            }
          }
          useBaseStore().firstItemInput = '';
          useBaseStore().secondItemInput = '';
          this.isActiveAdd = 1;
          useBaseStore().activeWindow = 'secondary';
          break;
        // cancel
        case 2:
          this.isActiveAdd = 1;
          useBaseStore().activeWindow = 'secondary';
          break;
      }
    },
    confirmKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          this.menuKeyUp('isActiveConfirm', this.confirmMenuItems);
          break;
        // key arrow down
        case 40:
          this.menuKeyDown('isActiveConfirm', this.confirmMenuItems);
          break;
        // enter
        case 13:
          this.confirmKeyEnter();
      }
    },
    confirmKeyEnter() {
      switch (this.isActiveConfirm) {
        case 1:
          if (this.isActiveMain === 2) {
            useUsersStore().deleteUser();
          } else if (this.isActiveMain === 3) {
            useBooksStore().deleteBook();
          }
          this.isActiveConfirm = 1;
          useBaseStore().confirmWindow = false;
          useBaseStore().stopActiveWindow = false;
          break;
        case 2:
          this.isActiveConfirm = 1;
          useBaseStore().confirmWindow = false;
          useBaseStore().stopActiveWindow = false;
          break;
      }
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
      if (this.isActiveBrowser === 1) {
        this.isActiveBrowser = this.getDataItemsLength;
      } else {
        this.isActiveBrowser--;
      }
      useBaseStore().focusBrowserWindow(this.isActiveBrowser);
    },
    browserKeyDown() {
      if (this.getDataItemsLength === 0) return;
      if (this.isActiveBrowser === this.getDataItemsLength) {
        this.isActiveBrowser = 1;
      } else {
        this.isActiveBrowser++;
      }
      useBaseStore().focusBrowserWindow(this.isActiveBrowser);
    }
  }
});
