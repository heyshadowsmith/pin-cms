<template>
  <Menu :links="themeData.boards" />
</template>

<script>
import Menu from '~/components/user/theme/Header/Menu'

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
