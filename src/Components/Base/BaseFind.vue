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
    {{ baseStore.findItems }}
  </th>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useMenuStore } from '@/stores/useMenu.js';
import { useBaseStore } from '@/stores/useBase.js';
import { useUsersStore } from '@/stores/useUsers.js';

const baseMenu = useMenuStore();
const baseStore = useBaseStore();
const baseUsers = useUsersStore();

const findFirstItem = ref('');
const findSecondItem = ref('');

const findPlaceholder = computed(() => {
  if (baseMenu.isActiveMain === 1) {
    return ['Find user', 'Find book'];
  } else if (baseMenu.isActiveMain === 2) {
    return ['Find lastname', 'Find firstname'];
  } else {
    return ['Find title', 'Find author'];
  }
});

watch(
  () => findFirstItem.value,
  (newValue) => {
    const index = baseUsers.users.findIndex(
      (user) =>
        user[1].lastName.toLowerCase().startsWith(newValue.toLowerCase()) &&
        user[1].firstName.toLowerCase().startsWith(findSecondItem.value.toLowerCase())
    );
    if (index !== -1) {
      baseMenu.isActiveBrowser = index + 1;
      baseStore.browserWindowRef[index + 1].scrollIntoView({
        block: 'center'
      });
    } else {
      console.log('nothing');
    }
  }
);

watch(
  () => findSecondItem.value,
  (newValue) => {
    const index = baseUsers.users.findIndex(
      (user) =>
        user[1].firstName.toLowerCase().startsWith(newValue.toLowerCase()) &&
        user[1].lastName.toLowerCase().startsWith(findFirstItem.value.toLowerCase())
    );
    if (index !== -1) {
      baseMenu.isActiveBrowser = index + 1;
      baseStore.browserWindowRef[index + 1].scrollIntoView({
        block: 'center'
      });
    }
  }
);
</script>
