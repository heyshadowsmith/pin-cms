<template>
  <div>
    <PAdminMenu v-if="loggedIn" />
    <PMenu :links="categories" />
    <nuxt-child />
  </div>
</template>

<script>
import { uniqBy } from 'lodash'
import PAdminMenu from '~/components/admin/PAdminMenu'
import PMenu from '~/components/theme/default/PMenu'
import config from '~/config'
const axios = require('axios')

export default {
  components: {
    PAdminMenu,
    PMenu
  },
  async asyncData () {
    // Only last 50 pins are returned, therefore, category limits must be set.
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${config.user}/pins/`)
    const pins = response.data.data.pins
    let categories = []

    pins.forEach((pin) => {
      const name = pin.board.name
      const slug = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')

      if (!name.startsWith('Unedited')) {
        categories.push({
          name,
          slug,
          img: pin.images['564x'].url
        })
      }
    })

    categories = uniqBy(categories, category => category.name)

    return {
      categories
    }
  },
  data () {
    return {
      loggedIn: false
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      const user = window.netlifyIdentity.currentUser()

      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
  }
}
</script>
