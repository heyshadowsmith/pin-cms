<template>
  <Home :home-data="homeData" />
</template>

<script>
import Home from '~/user/theme/pages/Home'

import config from '~/config'
import { getCategories } from '~/core/utilities/getCategories'

export default {
  components: {
    Home
  },
  async asyncData () {
    const categories = await getCategories(config.user)

    return {
      homeData: {
        categories
      }
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
