<template>
  <div>
    <button @click="generate">
      Generate Static Site
    </button>
    <div v-for="(pin, index) in pins" :key="index">
      <nuxt-link :to="`/admin/${pin.id}`">
        <img :src="pin.images['564x'].url">
        {{ pin.category }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import config from '~/config'
const axios = require('axios')

export default {
  async asyncData () {
    // Only last 50 pins are returned, therefore, category limits must be set.
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${config.user}/pins/`)
    const pins = response.data.data.pins
    const uneditedPins = []

    pins.forEach((pin) => {
      // Create pin ID
      const pinImage = pin.images['564x'].url
      pin.id = pinImage.substring(
        pinImage.lastIndexOf('/') + 1,
        pinImage.lastIndexOf('.')
      )

      const category = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')
      pin.category = category

      if (pin.category.startsWith('unedited-')) {
        uneditedPins.push(pin)
      }
    })

    return {
      pins: uneditedPins
    }
  },
  methods: {
    generate () {
      axios.post('https://api.netlify.com/build_hooks/5e78a97090508d14f8a20331')
    }
  }
}
</script>

<style>
</style>
