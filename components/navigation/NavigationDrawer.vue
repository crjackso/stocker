<template>
  <section>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      data-test-nav-drawer
      :aria-expanded="modelValue"
      app
      tag="nav"
      class="navigation-drawer"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="d-flex flex-column justify-space-between">
        <v-list nav dense>
          <NavigationLinks />
        </v-list>
        <v-list nav dense />
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
import NavigationLinks from '~/components/navigation/NavigationLinks'

export default {
  name: 'NavigationDrawer',
  components: {
    NavigationLinks
  },
  props: {
    modelValue: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rail: true,
      drawer: true
    }
  },
  watch: {
    modelValue(newVal) {
      this.rail = !newVal
    }
  },
  methods: {
    onMouseLeave() {
      if (!this.modelValue) {
        this.rail = true
      }
    },
    onMouseEnter() {
      this.rail = false
    }
  }
}
</script>

<style scoped>
:deep(.navigation-drawer) {
  top: var(--headerHeight);
  border-right: 2px solid var(--secondary);
}
</style>
