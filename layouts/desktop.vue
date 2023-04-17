<template>
  <v-app>
    <top-navigation :drawer-open="drawerOpen" @toggle-drawer="toggleDrawer" />
    <navigation-drawer v-model="drawerOpen" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopNavigation from '~/components/navigation/TopNavigation'
import NavigationDrawer from '~/components/navigation/NavigationDrawer'

export default {
  name: 'DesktopLayout',
  components: {
    TopNavigation,
    NavigationDrawer
  },
  data () {
    return {
      drawerOpen: false
    }
  },
  methods: {
    toggleDrawer () {
      this.drawerOpen = !this.drawerOpen
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.theme--light.v-app-bar.v-toolbar.v-sheet) {
  background-color: var(--container);
}

.v-main {
  height: 100vh;
  background-color: var(--background);
  overflow: scroll;
}

</style>
