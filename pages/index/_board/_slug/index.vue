<template>
  <div>
    <h1>{{ pin.title }}</h1>
    <img :src="pin.images['564x'].url">
    <p>{{ pin.description }}</p>
  </div>
</template>

<script>
import config from '~/config'
import { getPin } from '~/core/utilities/getPin'

export default {
  async asyncData ({ params }) {
    const pin = await getPin(config.user, params)

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
