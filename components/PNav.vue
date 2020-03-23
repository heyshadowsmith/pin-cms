<template>
  <nav class="bg-white flex justify-between items-center py-4 px-4 md:px-10 border-b">
    <h1 class="text-xl font-medium">
      <nuxt-link to="/admin">
        PinterestCMS
      </nuxt-link>
    </h1>
    <button class="bg-pinterest text-white font-medium py-2 px-4 rounded" @click="generate">
      Publish Updates
    </button>
  </nav>
</template>

<script>
import axios from '@nuxtjs/axios'

export default {
  name: 'PNav',
  methods: {
    generate () {
      axios.post('https://api.netlify.com/build_hooks/5e78a97090508d14f8a20331')
    }
  }
}
</script>
