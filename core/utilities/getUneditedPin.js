const axios = require('axios')

async function getUneditedPin (user, params) {
  const id = params.id
  // Only last 50 pins are returned, therefore, board limits must be set.
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`)
  const pins = response.data.data.pins

  const pin = pins.find((pin) => {
    const pinImage = pin.images['564x'].url

    const pinID = pinImage.substring(
      pinImage.lastIndexOf('/') + 1,
      pinImage.lastIndexOf('.')
    )

    return pinID === id
  })

  return pin
}

module.exports = {
  getUneditedPin
}
