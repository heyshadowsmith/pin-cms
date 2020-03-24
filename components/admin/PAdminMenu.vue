<template>
  <nav class="bg-white flex justify-between items-center py-4 px-4 md:px-10 border-b">
    <h1 class="text-xl font-medium">
      <nuxt-link to="/admin">
        PinterestCMS
      </nuxt-link>
    </h1>
    <div>
      <button class="mr-6" @click="logout">
        Log out
      </button>
      <button class="border font-medium py-2 px-4 rounded" :class="styles" @click="generate">
        <span v-if="!loading">Publish updates</span>
        <span v-else>Build triggered</span>
      </button>
    </div>
  </nav>
</template>

<script>
const axios = require('axios')

export default {
  name: 'PNav',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    styles () {
      return {
        'bg-pinterest': !this.loading,
        'text-white': !this.loading,
        'border-transparent': !this.loading,
        'bg-gray-100': this.loading,
        'border-gray-300': this.loading,
        'text-black': this.loading
      }
    }
  },
  methods: {
    logout () {
      window.netlifyIdentity.logout()
      this.$router.push('/login')
    },
    generate () {
      this.loading = true

      axios.post('https://api.netlify.com/build_hooks/5e78a97090508d14f8a20331')

      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>
