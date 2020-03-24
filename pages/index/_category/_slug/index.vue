<template>
  <div>
    <h1>{{ pin.title }}</h1>
    <img :src="pin.images['564x'].url">
    <p>{{ pin.description }}</p>
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

    const pin = pins.find((pin) => {
      return pin.slug === params.slug
    })

    return {
      pin
    }
  },
  head () {
    return {
      title: `${this.pin.title} | ${config.title}` || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.pin.description || '' }
      ]
    }
  }
}
</script>
