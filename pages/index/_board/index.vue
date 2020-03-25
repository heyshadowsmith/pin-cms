<template>
  <Board :board-data="boardData" />
</template>

<script>
import Board from '~/user/theme/pages/Board'
import config from '~/config'
const axios = require('axios')

export default {
  components: {
    Board
  },
  async asyncData ({ params }) {
    const board = params.board
    const response = await axios.get(`https://api.pinterest.com/v3/pidgets/boards/${config.user}/${board}/pins/`)
    const pins = response.data.data.pins
    const boardDetails = response.data.data.board

    pins.forEach((pin) => {
      // Create pin ID
      const pinImage = pin.images['564x'].url
      pin.id = pinImage.substring(
        pinImage.lastIndexOf('/') + 1,
        pinImage.lastIndexOf('.')
      )
      // Create title
      pin.title = pin.description.split(' |')[0]
      // Create slug
      pin.slug = pin.title.toLowerCase().split(' ').join('-').split('\'').join('')
      // Get hashtags
      pin.hashtags = pin.description.split(' #')
      pin.hashtags.shift()
      // Get description
      pin.description = pin.description.split('| ')[1].split(' #')[0]
    })

    return {
      boardDetails,
      boardData: {
        board,
        pins
      }
    }
  },
  head () {
    return {
      title: `${this.boardDetails.name} | ${config.title}` || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.boardDetails.description || '' }
      ]
    }
  }
}
</script>
