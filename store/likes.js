const state = () => ({

})

const getters = {}

const mutations = {

}

const actions = {
  async likeFilm({commit}, id) {
    try {
      let {data} = await this.$axios.post(this.$api.urls.likeFilm + id)
      return data
    } catch(error) {
      console.log('ERRROR')
    }
  },

  async dislikeFilm({commit}, id) {
    try {
      let {data} = await this.$axios.post(this.$api.urls.dislikeFilm + id)
      return data
    } catch(error) {
      console.log('ERRROR')
    }
  },

  async likeComment({commit}, id) {
    try {
      let {data} = await this.$axios.post(this.$api.urls.likeComment + id)
      return data
    } catch(error) {
      console.log('ERRROR')
    }
  },

  async dislikeComment({commit}, id) {
    try {
      let {data} = await this.$axios.post(this.$api.urls.dislikeComment + id)
      return data
    } catch(error) {
      console.log('ERRROR')
    }
  }
}

export default { mutations, state, actions, getters }
