const { uniqBy } = require('lodash')
const axios = require('axios')

async function getBoards (user) {
  // Only last 50 pins are returned, therefore, board limits must be set.
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`)
  const pins = response.data.data.pins
  let boards = []

  pins.forEach((pin) => {
    const name = pin.board.name
    const slug = name.toLowerCase().split(' ').join('-').split('\'').join('')

    if (!name.startsWith('Unedited')) {
      boards.push({
        name,
        slug,
        img: pin.images['564x'].url
      })
    }

    boards = uniqBy(boards, board => board.name)
  })

  return boards
}

module.exports = {
  getBoards
}
