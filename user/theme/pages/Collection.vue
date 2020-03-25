<template>
  <div>
    <nuxt-link v-for="(pin, index) in collectionData.pins" :key="index" :to="`/${collectionData.category}/${pin.slug}`">
      {{ pin.title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  props: {
    collectionData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
