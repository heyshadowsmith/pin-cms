<template>
  <div class="flex flex-col sm:flex-row flex-wrap min-h-screen">
    <nuxt-link v-for="(category, index) in homeData.categories" :key="index" :to="category.slug" class="tile flex sm:w-1/3 h-half-screen bg-cover bg-center" :style="{ backgroundImage: `url(${category.img})` }">
      <div class="overlay flex-grow flex justify-center items-center">
        <h1 class="text-2xl text-white font-bold uppercase">
          {{ category.name }}
        </h1>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    homeData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>
.tile:hover .overlay {
  display: flex;
  background: rgba(0, 0, 0, .5)
}

.overlay {
  display: none;
}
</style>
