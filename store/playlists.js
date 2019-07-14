import {urls, base} from '../common/api.js'

const state = () => ({
  playlists: {},
  currentPlaylist: null
})

const getters = {

}

const mutations = {
  SET_PLAYLISTS(state, data) {
    state.playlists = data
  },
  SET_CURRENT_PLAYLIST(state, data) {
    state.currentPlaylist = data
  }
}

const actions = {
  async setPlaylists({ commit, state }, url) {
      try {
        let {data} = await this.$axios.get(url)

        if(data.ok)
          commit('SET_PLAYLISTS', data)

        if(data.message)
          this.$toast.show(data.message)
      } catch(error) {
        console.log('ERRROR')
      }
  },

  async setCurrentPlaylist({ commit }, url) {
      try {
        let {data} = await this.$axios.get(url)

        // if(data.ok)
          await commit('SET_CURRENT_PLAYLIST', data)

        if(data.message)
          await this.$toast.show(data.message)
      } catch(errosr) {
        console.log('ERRR111OR')
      }
  },
}

export default { mutations, state, actions, getters }
