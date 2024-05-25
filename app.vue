<template>
  <NuxtLoadingIndicator class="loading-indicator" />
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

<style lang="scss">
.loading-indicator {
  background-color: var(--secondary);
}
</style>
