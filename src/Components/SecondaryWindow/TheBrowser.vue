<template>
  <table class="w-full text-sm text-left text-slate-200 relative">
    <thead class="text-s text-slate-200 uppercase bg-cyan-500 sticky top-0">
      <base-find />
      <browser-heading />
    </thead>
    <tbody>
      <browser-data />
    </tbody>
  </table>
</template>

<script setup>
import BaseFind from '../Base/BaseFind.vue';
import BrowserHeading from './BrowserHeading.vue';
import BrowserData from './BrowserData.vue';
</script>
