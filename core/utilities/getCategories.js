const { uniqBy } = require('lodash')
const axios = require('axios')

async function getCategories (user) {
  // Only last 50 pins are returned, therefore, category limits must be set.
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`)
  const pins = response.data.data.pins
  let categories = []

  pins.forEach((pin) => {
    const name = pin.board.name
    const slug = name.toLowerCase().split(' ').join('-').split('\'').join('')

    if (!name.startsWith('Unedited')) {
      categories.push({
        name,
        slug,
        img: pin.images['564x'].url
      })
    }

    categories = uniqBy(categories, category => category.name)
  })

  return categories
}

module.exports = {
  getCategories
}
