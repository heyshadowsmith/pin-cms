<template>
  <div>
    <nuxt-link to="/">
      Home
    </nuxt-link>
    <nuxt-link v-for="(menuItem, index) in menuItems" :key="index" :to="`/${menuItem.slug}`">
      {{ menuItem.name }}
    </nuxt-link>
    <nuxt-child />
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
    const categories = []

    pins.forEach((pin) => {
      const category = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')

      if (!categories.includes(category, 0)) {
        categories.push(category)
      }
    })

    return {
      categories
    }
  },
  computed: {
    menuItems () {
      const menuItems = []

      this.categories.forEach((category) => {
        const words = category.split('-')
        const newWords = []

        words.forEach((word) => {
          newWords.push(word.charAt(0).toUpperCase() + word.substring(1))
        })

        const name = newWords.join(' ')

        if (!name.startsWith('Unedited')) {
          menuItems.push({
            name,
            slug: category
          })
        }
      })

      return menuItems
    }
  }
}
</script>
