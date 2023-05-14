import { defineStore } from 'pinia';
import axios from 'axios';

export const useBorrowsStore = defineStore('borrows', {
  state: () => {
    return {
      borrows: []
    };
  },
  getters: {
    getBorrows(state) {
      return state.borrows;
    }
  },
  actions: {
    async fetchBorrows() {
      try {
        const data = await axios.get(
          'https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/borrows.json'
        );
        this.borrows = Object.entries(data.data);
        console.log(this.borrows);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
