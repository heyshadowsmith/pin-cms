<template>
  <div>
    <PNav />
    <div class="py-8 px-4 sm:w-2/3 lg:w-1/2 mx-auto">
      <div class="w-full flex justify-between items-center mb-6">
        <h2 class="text-md sm:text-xl font-medium">
          <span v-if="pins.length === 0">Hmmm... There's no content to pin</span>
          <span v-else>New content to pin</span>
        </h2>
        <nuxt-link to="/" class="border bg-white font-medium py-2 px-4 rounded inline-block">
          View website
        </nuxt-link>
      </div>
      <div v-if="pins.length === 0" class="border rounded bg-white p-4 text-gray-600">
        <p class="mb-4">
          Pin something to a board called "Unedited [Category Name]" and then come back here to repin that pin. If you get confused, please read our guide on <a class="text-pinterest font-medium" href="#">how to add content to your website</a>.
        </p>
        <a class="bg-pinterest text-white font-medium py-2 px-4 rounded inline-block" href="https://pinterest.com" target="_blank">
          Go to Pinterest
        </a>
      </div>
      <nuxt-link v-for="(pin, index) in pins" v-else :key="index" class="flex flex-col-reverse md:flex-row border rounded bg-white p-4 mb-6" :to="`/admin/${pin.id}`">
        <img class="w-full rounded mr-4 md:w-24" :src="pin.images['564x'].url">
        <div class="w-full flex items-center justify-between lg:justify-start mb-4 p-4 md:mb-0">
          <div class="flex flex-col lg:mr-12">
            <p>{{ pin.board.name }}</p>
            <p class="text-xs text-medium text-gray-500">
              Current board
            </p>
          </div>
          <div class="flex flex-col lg:mr-12">
            <p>{{ pin.targetBoard }}</p>
            <p class="text-xs text-medium text-gray-500">
              Target board
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
import PNav from '~/components/admin/PNav'
import config from '~/config'
const axios = require('axios')

export default {
  components: {
    PNav
  },
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
  }
}
</script>
