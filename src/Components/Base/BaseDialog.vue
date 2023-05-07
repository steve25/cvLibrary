<template>
  <Teleport to="body">
    <dialog
      v-if="base.dialogWindow"
      class="absolute top-0 right-0 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div class="p-6 bg-fuchsia-500 text-gray-200 border border-white cursor-default">
        <div class="flex justify-around">{{ base.dialogText }}</div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
import { useBaseStore } from '@/stores/base.js';

const base = useBaseStore();
</script>
