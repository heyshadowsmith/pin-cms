<template>
  <div>
    <PAdminMenu v-if="loggedIn" />
    <Theme :theme-data="themeData">
      <nuxt-child />
    </Theme>
  </div>
</template>

<script>
import PAdminMenu from '~/core/admin/PAdminMenu'
import Theme from '~/user/theme'

import config from '~/config'
import { getCategories } from '~/core/utilities/getCategories'

export default {
  components: {
    Theme,
    PAdminMenu
  },
  async asyncData () {
    const categories = await getCategories(config.user)

    return {
      themeData: {
        categories
      }
    }
  },
  data () {
    return {
      loggedIn: false
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      const user = window.netlifyIdentity.currentUser()

      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
  }
}
</script>
