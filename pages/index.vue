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
import { getBoards } from '~/core/utilities/getBoards'

export default {
  components: {
    Theme,
    PAdminMenu
  },
  async asyncData () {
    const boards = await getBoards(config.user)

    return {
      themeData: {
        boards
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
