<template>
  <div>
    {{ pin }} - {{ link }}
    <input v-if="pin.category === 'unedited-products'" v-model="rawAffiliateLink" class="border" type="text" placeholder="Affiliate link">
    <input v-model="rawTitle" class="border" type="text" placeholder="Title">
    <input v-model="rawDescription" class="border" type="text" placeholder="Description">
    <input v-model="rawHashtags" class="border" type="text" placeholder="Hashtags">
    <a :href="createPinLink">
      Save Pin
    </a>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
      return this.title.toLowerCase().split(' ').join('-').split('\'').join('')
    },
    link () {
      if (this.pin.category === 'unedited-products') {
        return this.rawAffiliateLink.split(':').join('%3A').split('/').join('%2F')
      }

      return `${config.domain}%2F${this.category}%2F${this.slug}`.split(':').join('%3A').split('/').join('%2F')
    },
    picture () {
      return this.pin.images['564x'].url.split(':').join('%3A').split('/').join('%2F')
    },
    title () {
      return `${this.rawTitle.split(' ').join('%20')}%20%7C%20`
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
      return `https://www.pinterest.com/pin/create/button/?url=${this.website}&media=${this.picture}&description=${this.title}${this.description}${this.hashtags}`
    }
  },
  created () {
    this.storeCategories(this.categories)
  },
  methods: mapMutations({
    storeCategories: 'global/storeCategories'
  })
}
</script>
