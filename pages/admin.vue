<template>
  <div class="bg-gray-100 min-h-screen pb-6">
    <div v-if="loggedIn">
      <nuxt-child />
      <p class="text-center text-xs text-gray-500">
        {{ new Date().getFullYear() }} PinterestCMS, All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
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
