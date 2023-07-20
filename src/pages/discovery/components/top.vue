

<template lang="pug">
.top
  h1 Discovery
  ul
    li(v-for="item in nav" :key="item.id")
      a(:href="item.url") {{ item.text }}

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
    url: '/html/discovery'
  },
  {
    id: 3,
    text: 'About',
    url: '/html/About'
  }
])
</script>

