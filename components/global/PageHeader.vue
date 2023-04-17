<template>
  <header class="d-flex justify-space-between flex-column flex-sm-row mb-4" :class="{'mt-4': $device.isMobile}">
    <h1 :data-test-page-header="text" :class="{'pl-4': onMobileDevice}" class="page-header">
      <slot />
    </h1>
    <slot name="actions" />
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    onMobileDevice () {
      return this.$device.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    font-size: 24px;
  }
</style>
