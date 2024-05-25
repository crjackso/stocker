<template>
  <header
    class="d-flex justify-space-between flex-column flex-sm-row mb-4"
    :class="{ 'mt-4': onMobileDevice }"
  >
    <h1
      :data-test-page-header="text"
      :class="{ 'pl-4': onMobileDevice }"
      class="page-header"
    >
      {{ text }}
      <slot />
    </h1>
    <slot name="actions" />
  </header>
</template>

<script setup>
const { isMobile } = useDevice()

defineProps({
  text: {
    type: String,
    default: ''
  }
})

const onMobileDevice = computed(() => {
  return isMobile
})
</script>

<style lang="scss" scoped>
.page-header {
  font-size: 24px;
}
</style>
