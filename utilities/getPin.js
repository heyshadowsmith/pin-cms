const axios = require('axios')

async function getPin (user, params) {
  const board = params.board
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/boards/${user}/${board}/pins/`)
  const pins = response.data.data.pins

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

  const pin = pins.find((pin) => {
    return pin.slug === params.slug
  })

  return pin
}

module.exports = {
  getPin
}
