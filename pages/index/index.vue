<template>
  <Home :home-data="homeData" />
</template>

<script>
import Home from '~/user/theme/pages/Home'

import config from '~/config'
import { getBoards } from '~/core/utilities/getBoards'

export default {
  components: {
    Home
  },
  async asyncData () {
    const boards = await getBoards(config.user)

    return {
      homeData: {
        boards
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
