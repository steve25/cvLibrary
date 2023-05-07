<template>
  <dialog
    v-if="base.activeWindow === 'quit'"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="w-[600px] p-6 bg-blue-800 shadow-xl text-gray-200 border border-white cursor-default"
    >
      <div class="text-center mb-6">
        <h3 class="text-2xl">Quit</h3>
        <p>Press "Enter" to run again.</p>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { useBaseStore } from '@/stores/base.js';

const base = useBaseStore();
</script>
