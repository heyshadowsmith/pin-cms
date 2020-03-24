<template>
  <div class="bg-gray-100 min-h-screen pb-6">
    <div v-if="!loggedIn" class="min-h-screen flex flex-col justify-center items-center">
      <div class="border rounded bg-white p-4 mb-6">
        <h1 class="text-xl font-medium mb-2">
          PinterestCMS
        </h1>
        <p class="mb-4 text-gray-600">
          In order to access the admin area of this website, you must log in.
        </p>
        <button class="bg-pinterest text-white font-medium py-2 px-4 rounded inline-block" @click="login">
          Log in
        </button>
      </div>
      <p class="text-center text-xs text-gray-500">
        {{ new Date().getFullYear() }} PinterestCMS, All Rights Reserved.
      </p>
    </div>
    <div v-else>
      <nuxt-child />
      <p class="text-center text-xs text-gray-500">
        {{ new Date().getFullYear() }} PinterestCMS, All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<script>
if (process.client) {
  window.netlifyIdentity.on('login', () => {
    location.reload()
  })
}

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
    login () {
      window.netlifyIdentity.open()
    },
    getUser () {
      const user = window.netlifyIdentity.currentUser()

      if (user) {
        this.loggedIn = true
      } else {
        window.netlifyIdentity.open()
      }
    }
  }
}
</script>
