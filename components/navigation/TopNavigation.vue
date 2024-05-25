<template>
  <v-app-bar flat dense border extension-height="30px">
    <v-btn
      icon
      data-test-nav-expander
      :color="drawerOpen ? null : 'primary'"
      @click="handleClick"
    >
      <v-icon :icon="drawerNavToggleIcon" />
    </v-btn>
    <NuxtLink to="/" class="d-flex ml-2">
      <img src="~/assets/images/logo-no-background.png" alt="Stocker Logo" class="main-logo">
    </NuxtLink>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopNavigation',
  props: {
    showUserNav: {
      type: Boolean,
      default: true
    },
    drawerOpen: {
      type: Boolean,
      default: true
    },
    app: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean
    }
  },
  data() {
    return {
      userMenuActive: false
    }
  },
  computed: {
    drawerNavToggleIcon() {
      return this.drawerOpen ? 'fa:fas fa-xmark' : 'fa:fas fa-bars'
    }
  },
  methods: {
    handleClick() {
      this.$emit('toggle-drawer')
    }
  }
}
</script>
