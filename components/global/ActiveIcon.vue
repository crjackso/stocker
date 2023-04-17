<template>
  <v-icon

    :active="active"
    :icon="iconClass"
  >
  </v-icon>
</template>

<script>
/**
 * Displays an icon from fontawesome pro
 * in either light or solid variant
 */
export default {
  name: 'ActiveIcon',
  props: {
    /**
     * The name of the corresponding icon
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * If active is true, show the solid version,
     * else show the light version
    */
    active: {
      type: Boolean,
      default: false
    },
    activeIcon: {
      type: String,
      default (props) {
        return props.icon
      }
    }
  },
  computed: {
    /**
     * Returns class, fas for solid, fal for light
     */
    // iconType () {
    //   return this.active ? 'fas' : 'far'
    // },
    activeClass () {
      return this.active ? this.icon : this.activeIcon
    },
    /**
     * Font awesome icons are determined by a combination of two classes
     */
    iconClass () {
      return `fa:far ${this.activeClass}` //`${this.iconType} ${this.active ? this.activeIcon : this.icon}`
    }
  }
}
</script>
