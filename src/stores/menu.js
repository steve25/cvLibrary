import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      mainMenuItems: ['Borrows', 'Users', 'Books', 'Quit'],
      isActiveMain: 1,
      activeWindow: 'main',
      secondaryMenuItems: ['Add', 'Edit', 'Delete', 'Close'],
      isActiveSecondary: 1
    };
  },
  actions: {
    mainKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          if (this.isActiveMain === 1) {
            this.isActiveMain = this.mainMenuItems.length;
          } else {
            this.isActiveMain--;
          }
          break;
        // key arrow down
        case 40:
          if (this.isActiveMain === this.mainMenuItems.length) {
            this.isActiveMain = 1;
          } else {
            this.isActiveMain++;
          }
          break;
        // enter
        case 13:
          switch (this.isActiveMain) {
            case 1:
            case 2:
            case 3:
              this.activeWindow = 'secondary';
              break;
            case 4:
              (this.isActiveMain = 1), (this.isActiveSecondary = 1);
              this.activeWindow = 'quit';
              break;
          }
      }
    },

    //keypress in secondary window
    secondaryKeyControl(e) {
      switch (e.keyCode) {
        // key arrow up
        case 38:
          if (this.isActiveSecondary === 1) {
            this.isActiveSecondary = this.secondaryMenuItems.length;
          } else {
            this.isActiveSecondary--;
          }
          break;
        // key arrow down
        case 40:
          if (this.isActiveSecondary === this.secondaryMenuItems.length) {
            this.isActiveSecondary = 1;
          } else {
            this.isActiveSecondary++;
          }
          break;
        // enter
        case 13:
          switch (this.isActiveSecondary) {
            case 1:
            case 2:
            case 3:
              console.log(this.isActiveSecondary);
              break;
            case 4:
              (this.isActiveMain = 1), (this.isActiveSecondary = 1);
              this.activeWindow = 'main';
              break;
          }
          break;
      }
    },
    quitKeyControl(e) {
      if (e.keyCode === 13) {
        this.activeWindow = 'main';
      }
    }
  }
});
