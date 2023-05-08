<template>
  <th scope="col" class="px-2 py-1 border-r-2 border-gray-400 text-slate-800">
    <input
      type="text"
      class="w-full font-normal"
      :placeholder="findPlaceholder[0]"
      v-model="findFirstItem"
    />
  </th>
  <th scope="col" class="px-2 py-1 text-slate-800">
    <input
      type="text"
      class="w-full font-normal"
      :placeholder="findPlaceholder[1]"
      v-model="findSecondItem"
    />
  </th>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useBaseStore } from '@/stores/base.js';
import { useMenuStore } from '@/stores/menu.js';
import { useUsersStore } from '@/stores/users.js';
import { useBooksStore } from '@/stores/books.js';

const base = useBaseStore();
const menu = useMenuStore();
const users = useUsersStore();
const books = useBooksStore();

const findFirstItem = ref('');
const findSecondItem = ref('');

const findPlaceholder = computed(() => {
  if (menu.activeMainItem === 1) return ['Find user', 'Find book', 'borrows.borrows'];
  if (menu.activeMainItem === 2) return ['Find lastname', 'Find firstname', 'users.users'];
  return ['Find title', 'Find author', 'books.books'];
});

const datas = computed(() => {
  if (menu.activeMainItem === 1) return borrows.borrows;
  if (menu.activeMainItem === 2) return users.users;
  return books.books;
})

watch(
  () => findFirstItem.value,
  (newValue) => {
    console.log(datas.value);
    const index = datas.value.findIndex(
      (user) =>
        user[1].lastName.toLowerCase().startsWith(newValue.toLowerCase()) &&
        user[1].firstName.toLowerCase().startsWith(findSecondItem.value.toLowerCase())
    );
    if (index !== -1) {
      menu.activeBrowserItem = index + 1;
      base.focusBrowserWindow(index + 1);
      // base.browserWindowRef[index + 1].scrollIntoView({
      //   block: 'center'
      // });
    } 
  }
);

watch(
  () => findSecondItem.value,
  (newValue) => {
    const index = findPlaceholder[2].findIndex(
      (user) =>
        user[1].firstName.toLowerCase().startsWith(newValue.toLowerCase()) &&
        user[1].lastName.toLowerCase().startsWith(findFirstItem.value.toLowerCase())
    );
    if (index !== -1) {
      menu.activeBrowserItem = index + 1;
      base.focusBrowserWindow(index + 1);
      // base.browserWindowRef[index + 1].scrollIntoView({
      //   block: 'center'
      // });
    }
  }
);
</script>
