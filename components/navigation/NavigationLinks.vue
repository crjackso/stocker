<template>
  <div data-test-nav-links>
    <template v-for="link in links">
      <v-list-group
        v-if="link.isParent && !link.childless"
        :key="link.name"
        :class="hasActiveSubnav(link.name) ? 'active-parent-nav' : 'inactive-parent-nav'"
        :value="hasActiveSubnav(link.name)"
        :data-test-nav-item="link.name"
      >
        <template #activator>
          <!-- <v-list-item-icon> -->
            <active-icon :icon="link.icon" :active="hasActiveSubnav(link.name)" data-test-nav-icon />
            hi
          <!-- </v-list-item-icon> -->
          <v-list-item-title :data-test-nav-item-title="link.name">
            {{ link.name }}
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="sublink in link.sublinks"
          :key="sublink.name"
          :to="sublink.to"
          :data-test-sub-nav-item="sublink.name"
          :prepend-icon="sublink.icon"
        >
          <v-list-item-title>{{ sublink.name }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-else-if="!link.isParent"
        :key="link.name"
        :to="link.to"
        :data-test-nav-item="link.name"
        :prepend-icon="link.icon"
      >
        <v-list-item-title :data-test-nav-item-title="link.name">
          {{ link.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </div>
</template>

<script>
import navigationLinks from '~/navigationLinks'

export default {
  name: 'NavigationLinks',
  data () {
    return {
      links: navigationLinks()
    }
  },
  methods: {
    hasActiveChildRoute (route) {
      if (!this.$route) {
        return false
      } else if (route === '/') {
        return this.$route.path === route
      } else {
        return this.$route.path.startsWith(route)
      }
    },
    subroutes (parentNavName) {
      const parentNav = this.links.filter(link => link.name === parentNavName)[0]
      if (!parentNav) return []
      return parentNav.sublinks.map(link => link.to)
    },
    hasActiveSubnav (parentNavName) {
      return this.subroutes(parentNavName).some(
        route => this.hasActiveChildRoute(route)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  :deep(.v-list-item--link:before) {
    background-color: var(--primary);
  }

  :deep(.active-parent-nav.v-list-group .v-list-group__header.v-list-item--link:before) {
    background-color: var(--primary);
    opacity: 0.12;
  }

  .v-list .v-list-item--active,
  :deep(.active-parent-nav .v-list-group__header .v-list-item__icon i),
  :deep(.active-parent-nav .v-list-group__header .v-list-item__title) {
    color: var(--primary);
  }

  .v-list .v-list-item .v-list-item__title {
    line-height: 1.5rem;
    font-size: 14px;
  }

  .theme--light.v-list-item:hover:before {
    opacity: 0.1;
  }

  :deep(.inactive-parent-nav .v-list-item--active) {
    color: #eeeeee; // TODO (was bp-dark-gray)

    &:hover:before {
      opacity: 0;
    }

    .v-icon {
      color: rgba(0, 0, 0, 0.54);
    }
  }
</style>
