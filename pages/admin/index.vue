<template>
  <div class="bg-gray-100 min-h-screen">
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
    <div class="py-8 px-4 sm:w-2/3 lg:w-1/2 mx-auto">
      <h2 class="text-md sm:text-xl font-medium mb-6">
        New Content to Pin
      </h2>
      <nuxt-link v-for="(pin, index) in pins" :key="index" class="flex flex-col-reverse md:flex-row border rounded bg-white p-4 mb-6" :to="`/admin/${pin.id}`">
        <img class="w-full rounded mr-4 md:w-24" :src="pin.images['564x'].url">
        <div class="w-full flex items-center justify-between lg:justify-start mb-4 p-4 md:mb-0">
          <div class="flex flex-col lg:mr-12">
            <p>{{ pin.board.name }}</p>
            <p class="text-xs text-medium text-gray-500">
              Current Board
            </p>
          </div>
          <div class="flex flex-col lg:mr-12">
            <p>{{ pin.targetBoard }}</p>
            <p class="text-xs text-medium text-gray-500">
              Target Board
            </p>
          </div>
          <div class="flex flex-col">
            <p>{{ pin.aggregated_pin_data.aggregated_stats.saves }}</p>
            <p class="text-xs text-medium text-gray-500">
              Saves
            </p>
          </div>
        </div>
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

      // Add Pin category
      const category = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')
      pin.category = category

      // Add Pin target board
      pin.targetBoard = pin.board.name.split('Unedited ')[1]

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
