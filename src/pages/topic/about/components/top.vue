

<template lang="pug">
.top
  h1 Weixin
  p Welcome ~

</template>
<script setup lang="ts">
import { ref } from "vue"
const nav = ref([
  {
    id: 1,
    text: 'Home',
    url: '/'
  },
  {
    id: 2,
    text: 'Discovery',
    url: '/html/discovery.html'
  },
  {
    id: 3,
    text: 'About',
    url: '/html/about.html'
  }
])
</script>

