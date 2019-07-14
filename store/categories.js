import {urls, base} from '../common/api.js'

const state = () => ({
  categories: [],
})

const getters = {}

const mutations = {
  SET_CATEGORIES(state, data) {
    state.categories = data
  }
}

const actions = {
  async setCategories({ commit, state }, params) {
      try {
        let {data} = await axios.get(urls.getCategories)
        console.log(data)
        commit('SET_CATEGORIES', data.categories)
      } catch(error) {
        console.log('ERRROR', error.message)
      }
  },
}

export default { mutations, state, actions, getters }
