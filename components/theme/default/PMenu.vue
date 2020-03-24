<template>
  <div class="px-6 flex justify-between items-center">
    <nuxt-link to="/" class="py-4 px-3">
      <Logo />
    </nuxt-link>
    <div>
      <nuxt-link v-for="(link, index) in links" :key="index" class="text-xs inline-block py-4 px-3 uppercase font-bold" :to="`/${link.slug}`">
        {{ link.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/theme/default/Logo'

export default {
  name: 'PMenu',
  components: {
    Logo
  },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>
