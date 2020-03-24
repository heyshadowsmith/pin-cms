<template>
  <div class="menu">
    <nuxt-link v-for="(pin, index) in pins" :key="index" :to="`/${category}/${pin.slug}`">
      {{ pin.title }}
    </nuxt-link>
  </div>
</template>

<script>
import config from '~/config'
const axios = require('axios')

export default {
  async asyncData ({ params }) {
    const category = params.category
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/boards/${config.user}/${category}/pins/`)
    const pins = response.data.data.pins
    const board = response.data.data.board

    pins.forEach((pin) => {
      // Create pin ID
      const pinImage = pin.images['564x'].url
      pin.id = pinImage.substring(
        pinImage.lastIndexOf('/') + 1,
        pinImage.lastIndexOf('.')
      )
      // Create title
      pin.title = pin.description.split(' |')[0]
      // Create slug
      pin.slug = pin.title.toLowerCase().split(' ').join('-').split('\'').join('')
      // Get hashtags
      pin.hashtags = pin.description.split(' #')
      pin.hashtags.shift()
      // Get description
      pin.description = pin.description.split('| ')[1].split(' #')[0]
    })

    return {
      board,
      category,
      pins
    }
  },
  head () {
    return {
      title: `${this.board.name} | ${config.title}` || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.board.description || '' }
      ]
    }
  }
}
</script>
