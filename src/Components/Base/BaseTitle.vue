<template>
  <h1 :class="textSize">{{ title }}</h1>
</template>

<script setup>
const props = defineProps({
  title: String,
  textSize: String
});
</script>
