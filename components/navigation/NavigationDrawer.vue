<template>
  <section>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      data-test-nav-drawer
      :aria-expanded="modelValue"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      app
      tag="nav"
      class="navigation-drawer"
    >
      <div class="d-flex flex-column justify-space-between">
        <v-list
          nav
          dense
        >
          <NavigationLinks />
        </v-list>
        <v-list
          nav
          dense
        />
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
  data () {
    return {
      rail: true,
      drawer: true
    }
  },
  methods: {
    onMouseLeave () {
      if (!this.modelValue) {
        this.rail = true
      }
    },
    onMouseEnter () {
      this.rail = false
    }
  },
  watch: {
    modelValue (newVal) {
      this.rail = !newVal
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
