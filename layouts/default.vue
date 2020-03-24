<template>
  <nuxt />
</template>

<script>
export default {
  head () {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  }
}
</script>

<style>
.netlify-identity-menu {
  display: none;
}
</style>
