<template>
  <Menu :links="themeData.categories" />
</template>

<script>
import Menu from '~/user/theme/Header/Menu'

export default {
  name: 'Header',
  components: {
    Menu
  },
  props: {
    themeData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
