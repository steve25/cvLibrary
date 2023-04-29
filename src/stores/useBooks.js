import { defineStore } from 'pinia';
import axios from 'axios';

import { useBaseStore } from './useBase.js';
import { useMenuStore } from './useMenu.js';

export const useBooksStore = defineStore('books', {
  state: () => {
    return {
      books: []
    };
  },
  getters: {
    getBooks(state) {
      return state.books;
    }
  },
  actions: {
    async addNewBook() {
      const bookData = {
        title: useBaseStore().firstItemInput.trim(),
        author: useBaseStore().secondItemInput.trim()
      };

      try {
        const res = await axios.post(
          'https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/books.json',
          bookData
        );
        useBaseStore().showDialog('Book saved');
        await this.fetchBooks();
        let booksIndex = [];
        this.books.forEach((bookIndex) => {
          booksIndex.push(bookIndex);
        });
        let index = booksIndex.findIndex((i) => i[0] === res.data.name);
        useMenuStore().isActiveBrowser = index + 1;
        useBaseStore().focusBrowserWindow(useMenuStore().isActiveBrowser);
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async editNewBook() {
      const bookData = {
        title: useBaseStore().firstItemInput.trim(),
        author: useBaseStore().secondItemInput.trim()
      };
      try {
        await axios.put(
          `https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/books/${
            this.books[useMenuStore().isActiveBrowser - 1][0]
          }.json`,
          bookData
        );
        let oldIndex = this.books[useMenuStore().isActiveBrowser - 1][0];
        useBaseStore().showDialog('Book edited');
        await this.fetchBooks();
        let q = [];
        this.books.forEach((e) => {
          console.log(e);
          q.push(e);
        });
        let index = q.findIndex((i) => i[0] === oldIndex);
        useMenuStore().isActiveBrowser = index + 1;
        console.log(this.books[useMenuStore().isActiveBrowser - 1][0]);
        useBaseStore().browserWindowRef[index + 1].scrollIntoView({
          block: 'center'
        });
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async fetchBooks() {
      try {
        const data = await axios.get(
          'https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/books.json'
        );
        this.books = Object.entries(data.data).sort(
          (a, b) => a[1].author.localeCompare(b[1].author) || a[1].title.localeCompare(b[1].title)
        );
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    },
    async deleteBook() {
      try {
        const data = await axios.delete(
          `https://cvlibrary-fc29c-default-rtdb.europe-west1.firebasedatabase.app/books/${
            this.books[useMenuStore().isActiveBrowser - 1][0]
          }.json`
        );
        // useBaseStore().browserFirstItemRef.slice(useMenuStore().isActiveBrowser - 1, 1);
        // useBaseStore().browserSecondItemRef.slice(useMenuStore().isActiveBrowser - 1, 1);
        useBaseStore().showDialog('Book deleted');
        this.fetchBooks();
      } catch (error) {
        useBaseStore().showDialog(error);
      }
    }
  }
});
