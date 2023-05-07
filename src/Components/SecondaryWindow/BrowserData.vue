<template>
  <template v-for="(data, index) in dataValues.data" :key="data[0]">
    <tr
      :class="[menu.activeBrowserItem === index + 1 ? ['bg-blue-900', 'text-yellow-400'] : '']"
      :ref="(el) => (base.browserWindowRef[index + 1] = el)"
    >
      <td
        scope="row"
        class="px-2 border-r-2 border-gray-400"
        :ref="(el) => (base.browserFirstItemRef[index + 1] = el)"
      >
        {{ data[1][dataValues.template[0]] }}
      </td>
      <td class="px-2" :ref="(el) => (base.browserSecondItemRef[index + 1] = el)">
        {{ data[1][dataValues.template[1]] }}
      </td>
    </tr>
  </template>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useBaseStore } from '@/stores/base.js';
import { useMenuStore } from '@/stores/menu.js';
import { useUsersStore } from '@/stores/users.js';
import { useBooksStore } from '@/stores/books.js';
import { useBorrowsStore } from '@/stores/borrows.js';

const menu = useMenuStore();
const users = useUsersStore();
const books = useBooksStore();
const base= useBaseStore();
const borrows = useBorrowsStore();

const dataValues = computed(() => {
  base.browserWindowRef = [];
  if (menu.activeMainItem === 1)
    return { data: borrows.borrows, template: ['user_id', 'book_id'] };
  if (menu.activeMainItem === 2)
    return { data: users.users, template: ['lastName', 'firstName'] };
  return { data: books.books, template: ['title', 'author'] };
});

onMounted(() => {
  users.fetchUsers();
  books.fetchBooks();
  borrows.fetchBorrows();
});
</script>
