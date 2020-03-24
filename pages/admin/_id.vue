<template>
  <div>
    <PNav />
    <div class="py-8 px-4 sm:w-2/3 lg:w-2/3 mx-auto">
      <h2 class="text-md sm:text-xl font-medium mb-6">
        Repin back to Pinterest
      </h2>
      <div class="bg-white flex flex-col lg:flex-row rounded border w-full p-4 mx-auto">
        <div class="w-full lg:w-1/2">
          <img class="w-full rounded mb-4 md:mb-0" :src="pin.images['564x'].url">
        </div>
        <div class="lg:w-1/2 lg:pl-4 flex flex-col justify-between">
          <form class="mb-6">
            <input
              v-model="rawTitle"
              class="mb-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              placeholder="Title"
            >
            <textarea
              v-model="rawDescription"
              class="mb-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              placeholder="Description"
            />
            <input
              v-model="rawHashtags"
              class="mb-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              placeholder="Hashtags"
            >
            <input
              v-model="rawAffiliateLink"
              class="mb-4 bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              placeholder="Affiliate link (optional)"
            >
            <div class="flex items-center">
              <a target="_blank" class="bg-pinterest inline-block text-white font-medium py-2 px-4 rounded mr-4" :href="createPinLink">
                Repin
              </a>
              <p class="text-gray-500 text-sm">
                {{ totalPinDescriptionCharacters }} of 494
              </p>
            </div>
          </form>
          <div class="border rounded bg-gray-100 p-2 text-gray-600">
            <p class="text-sm">
              Remember to <a class="text-pinterest font-medium" :href="`https://pinterest.com${pin.board.url}`" target="_blank">delete this pin from your {{ pin.board.name }} board</a> on Pinterest when you're finished repinning it to your {{ pin.targetBoard }} board.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PNav from '~/components/PNav'
import config from '~/config'
const axios = require('axios')

export default {
  components: {
    PNav
  },
  async asyncData ({ params }) {
    const id = params.id
    // Only last 50 pins are returned, therefore, category limits must be set.
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${config.user}/pins/`)
    const pins = response.data.data.pins
    const categories = []

    pins.forEach((pin) => {
      // Create pin ID
      const pinImage = pin.images['564x'].url
      pin.id = pinImage.substring(
        pinImage.lastIndexOf('/') + 1,
        pinImage.lastIndexOf('.')
      )

      const category = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')
      pin.category = category

      // Add Pin target board
      pin.targetBoard = pin.board.name.split('Unedited ')[1]

      if (!categories.includes(category, 0)) {
        categories.push(category)
      } // This single "l" character was contributed by my 5 1/2 month old son Echo
    })

    const pin = pins.find((pin) => {
      return pin.id === id
    })

    return {
      pin
    }
  },
  data () {
    return {
      rawAffiliateLink: '',
      rawTitle: '',
      rawDescription: '',
      rawHashtags: ''
    }
  },
  computed: {
    category () {
      return this.pin.category.split('unedited-')[1]
    },
    slug () {
      return this.title.toLowerCase().split('%20').join('-').split('\'').join('')
    },
    link () {
      if (this.rawAffiliateLink) {
        return this.rawAffiliateLink.split(':').join('%3A').split('/').join('%2F')
      }

      return `${config.domain}%2F${this.category}%2F${this.slug}`.split(':').join('%3A').split('/').join('%2F')
    },
    picture () {
      return this.pin.images['564x'].url.split(':').join('%3A').split('/').join('%2F')
    },
    title () {
      return `${this.rawTitle.split(' ').join('%20')}`
    },
    description () {
      return `${this.rawDescription.split(' ').join('%20').split('!').join('%21')}%20`
    },
    hashtags () {
      return this.rawHashtags.split(' ').join('%20').split('#').join('%23')
    },
    totalPinDescriptionCharacters () {
      return this.title.length + this.description.length + this.hashtags.length - 3
    },
    createPinLink () {
      return `https://www.pinterest.com/pin/create/button/?url=${this.link}&media=${this.picture}&description=${this.title}%20%7C%20${this.description}${this.hashtags}`
    }
  }
}
</script>
