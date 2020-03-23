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
    <div class="py-8 px-4 sm:w-2/3 lg:w-2/3 mx-auto">
      <h2 class="text-md sm:text-xl font-medium mb-6">
        Add New Pin
      </h2>
      <div class="bg-white flex flex-col lg:flex-row rounded border w-full p-4 mx-auto">
        <div class="w-full lg:w-1/2">
          <img class="w-full rounded mb-4 md:mb-0" :src="pin.images['564x'].url">
        </div>
        <div class="lg:w-1/2 lg:pl-4">
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
          <a class="bg-pinterest inline-block text-white font-medium py-2 px-4 rounded" :href="createPinLink">
            Save Pin
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '~/config'
const axios = require('axios')

export default {
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
      return this.title.length + this.description.length + this.hashtags.length
    },
    createPinLink () {
      return `https://www.pinterest.com/pin/create/button/?url=${this.link}&media=${this.picture}&description=${this.title}%20%7C%20${this.description}${this.hashtags}`
    }
  },
  methods: {
    generate () {
      axios.post('https://api.netlify.com/build_hooks/5e78a97090508d14f8a20331')
    }
  }
}
</script>
