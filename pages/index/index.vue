<template>
  <div class="flex flex-col sm:flex-row flex-wrap min-h-screen">
    <nuxt-link v-for="(category, index) in categories" :key="index" :to="category.slug" class="tile flex sm:w-1/3 h-half-screen bg-cover bg-center" :style="{ backgroundImage: `url(${category.img})` }">
      <div class="overlay flex-grow flex justify-center items-center">
        <h1 class="text-2xl text-white font-bold uppercase">
          {{ category.name }}
        </h1>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { uniqBy } from 'lodash'
import config from '~/config'
const axios = require('axios')

export default {
  async asyncData () {
    // Only last 50 pins are returned, therefore, category limits must be set.
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${config.user}/pins/`)
    const pins = response.data.data.pins
    let categories = []

    pins.forEach((pin) => {
      const name = pin.board.name
      const slug = name.toLowerCase().split(' ').join('-').split('\'').join('')

      if (!name.startsWith('Unedited')) {
        categories.push({
          name,
          slug,
          img: pin.images['564x'].url
        })
      }

      categories = uniqBy(categories, category => category.name)
    })

    return {
      categories
    }
  }
}
</script>

<style>
.tile:hover .overlay {
  display: flex;
  background: rgba(0, 0, 0, .5)
}

.overlay {
  display: none;
}
</style>
