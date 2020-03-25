const axios = require('axios')

async function getUneditedPins (user) {
  // Only last 50 pins are returned, therefore, board limits must be set.
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`)
  const pins = response.data.data.pins
  const uneditedPins = []

  pins.forEach((pin) => {
    // Create pin ID
    const pinImage = pin.images['564x'].url
    pin.id = pinImage.substring(
      pinImage.lastIndexOf('/') + 1,
      pinImage.lastIndexOf('.')
    )

    // Add Pin collection
    pin.collection = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')

    // Add Pin target board
    pin.targetBoard = pin.board.name.split('Unedited ')[1]

    if (pin.collection.startsWith('unedited-')) {
      uneditedPins.push(pin)
    }
  })

  return uneditedPins
}

module.exports = {
  getUneditedPins
}
