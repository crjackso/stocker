<template>
  <section>
    <h1>Dashboard</h1>

    <markets-mover-lists />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'desktop'
})

useHead({
  title: 'Stocker Dashboard'
})
</script>
