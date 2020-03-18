export const state = () => ({
  categories: []
})

export const mutations = {
  storeCategories (state, categories) {
    state.categories = categories
  }
}
