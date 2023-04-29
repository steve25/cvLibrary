<template>
  <template v-for="(data, index) in dataValues.data" :key="data[0]">
    <tr
      :class="[baseMenu.isActiveBrowser === index + 1 ? ['bg-blue-900', 'text-yellow-400'] : '']"
      :ref="(el) => (baseStore.browserWindowRef[index + 1] = el)"
    >
      <td
        scope="row"
        class="px-2 border-r-2 border-gray-400"
        :ref="(el) => (baseStore.browserFirstItemRef[index + 1] = el)"
      >
        {{ data[1][dataValues.template[0]] }}
      </td>
      <td class="px-2" :ref="(el) => (baseStore.browserSecondItemRef[index + 1] = el)">
        {{ data[1][dataValues.template[1]] }}
      </td>
    </tr>
  </template>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useMenuStore } from '@/stores/useMenu.js';
import { useUsersStore } from '@/stores/useUsers.js';
import { useBooksStore } from '@/stores/useBooks.js';
import { useBaseStore } from '@/stores/useBase.js';
import { useBorrowsStore } from '@/stores/useBorrows.js';

const baseMenu = useMenuStore();
const baseUsers = useUsersStore();
const baseBooks = useBooksStore();
const baseStore = useBaseStore();
const baseBorrows = useBorrowsStore();

const dataValues = computed(() => {
  baseStore.browserWindowRef = [];
  if (baseMenu.isActiveMain === 1) {
    return { data: baseBorrows.borrows, template: ['user_id', 'book_id'] };
  } else if (baseMenu.isActiveMain === 2) {
    return { data: baseUsers.users, template: ['lastName', 'firstName'] };
  } else {
    return { data: baseBooks.books, template: ['title', 'author'] };
  }
});

onMounted(() => {
  baseUsers.fetchUsers();
  baseBooks.fetchBooks();
  baseBorrows.fetchBorrows();
});
</script>
