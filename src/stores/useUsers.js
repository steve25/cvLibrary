import { defineStore } from 'pinia';
import axios from 'axios';
import { useBaseStore } from './useBase.js';
import { useMenuStore } from './useMenu.js';

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      users: []
    };
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  actions: {
    async addNewUser() {
      const userData = {
        lastName: useBaseStore().firstItemInput.trim(),
        firstName: useBaseStore().secondItemInput.trim()
      };
      try {
        const result = await axios.post(
          'https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/users.json',
          userData
        );
        useBaseStore().showDialog('User saved');
        await this.fetchUsers();
        let q = [];
        this.users.forEach((e) => {
          q.push(e);
        });
        console.log(result.data.name);
        let index = q.findIndex((i) => i[0] === result.data.name);
        console.log(q);
        useMenuStore().isActiveBrowser = index + 1;
        useBaseStore().browserWindowRef[index + 1].scrollIntoView({
          block: 'center'
        });
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async editNewUser() {
      const usersData = {
        lastName: useBaseStore().firstItemInput.trim(),
        firstName: useBaseStore().secondItemInput.trim()
      };
      try {
        await axios.put(
          `https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/users/${
            this.users[useMenuStore().isActiveBrowser - 1][0]
          }.json`,
          usersData
        );
        let oldIndex = this.users[useMenuStore().isActiveBrowser - 1][0];
        useBaseStore().showDialog('User edited');
        await this.fetchUsers();
        let q = [];
        this.users.forEach((e) => {
          console.log(e);
          q.push(e);
        });
        let index = q.findIndex((i) => i[0] === oldIndex);
        useMenuStore().isActiveBrowser = index + 1;
        useBaseStore().browserWindowRef[index + 1].scrollIntoView({
          block: 'center'
        });
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async fetchUsers() {
      try {
        const data = await axios.get(
          'https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        );
        this.users = Object.entries(data.data).sort((a, b) =>
          a[1].lastName.localeCompare(b[1].lastName) || a[1].firstName.localeCompare(b[1].firstName)
        );
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async deleteUser() {
      try {
        const data = await axios.delete(
          `https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/users/${
            this.users[useMenuStore().isActiveBrowser - 1][0]
          }.json`
        );
        useBaseStore().showDialog('User deleted');
        this.fetchUsers();
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    }
  }
});