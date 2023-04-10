<template>
  <h1 :class="textSize">{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: String,
    textSize: String
  }
};
</script>
