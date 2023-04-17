<template>
  hello stocker!
</template>

<script>
import layoutMixin from '~/mixins/layout'

export default {
  name: 'IndexComponent',
  mixins: [layoutMixin],
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>