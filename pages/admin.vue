<template>
  <div>
    <div v-if="visible" data-netlify-identity-menu />
    <div v-else class="bg-gray-100 min-h-screen pb-6">
      <nuxt-child />
      <p class="text-center text-xs text-gray-500">
        {{ new Date().getFullYear() }} PinterestCMS, All Rights Reserved
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  }
}
</script>
