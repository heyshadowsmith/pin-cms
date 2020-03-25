<template>
  <div class="flex flex-col sm:flex-row flex-wrap min-h-screen">
    <nuxt-link v-for="(pin, index) in boardData.pins" :key="index" :to="`/${boardData.board}/${pin.slug}`" class="tile flex sm:w-1/3 h-half-screen bg-cover bg-center" :style="{ backgroundImage: `url(${pin.images['564x'].url})` }">
      <div class="overlay flex-grow flex justify-center items-center">
        <h1 class="text-2xl text-white font-bold uppercase">
          {{ pin.title }}
        </h1>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    boardData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
