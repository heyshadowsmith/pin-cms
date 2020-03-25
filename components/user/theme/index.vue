<template>
  <div>
    <Header :theme-data="themeData" />
    <slot />
  </div>
</template>

<script>
import Header from '~/components/user/theme/Header'

export default {
  name: 'Theme',
  components: {
    Header
  },
  props: {
    themeData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
