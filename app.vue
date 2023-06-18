<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const layout = computed(() => {
  return 'desktop'
})

useHead({
  titleTemplate: 'Stocker | %s',
  title: 'Home',
  bodyAttrs: {
    class: 'stocker-main-body'
  }
})
</script>
