<template>
  <div class="bg-gray-100 min-h-screen pb-6">
    <div v-if="loggedIn">
      <PAdminMenu />
      <nuxt-child />
      <PAdminFooter />
    </div>
  </div>
</template>

<script>
import PAdminMenu from '~/core/admin/PAdminMenu'
import PAdminFooter from '~/core/admin/PAdminFooter'

export default {
  components: {
    PAdminMenu,
    PAdminFooter
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
        this.$router.push('/login')
      }
    }
  }
}
</script>
