import axios from 'axios'
import config from './config'

const dynamicRoutes = async () => {
  const response = await axios.get(`https://api.pinterest.com/v3/pidgets/users/${config.user}/pins/`)
  const pins = response.data.data.pins
  const boards = []
  const routes = []

  pins.forEach((pin) => {
    const board = pin.board.name.toLowerCase().split(' ').join('-').split('\'').join('')

    if (!boards.includes(board, 0) && !board.startsWith('unedited-')) {
      boards.push(board)
      routes.push(`/${board}`)
    }
  })

  async function getSubRoutes () {
    for (const board of boards) {
      const response = await axios.get(`https://api.pinterest.com/v3/pidgets/boards/${config.user}/${board}/pins/`)
      const pins = response.data.data.pins

      pins.forEach((pin) => {
        pin.title = pin.description.split(' |')[0]
        pin.slug = pin.title.toLowerCase().split(' ').join('-').split('\'').join('')

        routes.push(`/${board}/${pin.slug}`)
      })
    }
  }

  await getSubRoutes()

  return routes
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: config.title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: config.description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  generate: {
    routes: dynamicRoutes
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
