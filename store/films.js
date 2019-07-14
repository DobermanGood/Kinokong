import Vue from 'vue'

const state = () => ({
  films: [],
  currentFilm: null,
  myFilms: {
    favourite: [],
    bookmark: [],
    viewed: [],
    liked: []
  }
})

const getters = {}

const mutations = {
  SET_FILMS(state, data) {
    state.films = data
  },
  SET_FILM(state, data) {
    state.currentFilm = data
  },
  SET_MY_FILMS(state, data) {
    state.myFilms[data.params] = data.data
  },
  SET_RECOMMEND_FILMS(state, data) {
    Vue.set(state.currentFilm, 'recommendFilms', data)
  }
}

const actions = {
  async setFilms({ commit }, url) {
      try {
        let {data} = await this.$axios.get(url)
        commit('SET_FILMS', data)
      } catch(error) {
        console.log('ERRROR')
      }
  },
  async setFilm({ commit }, url) {
      try {
        let {data} = await this.$axios.get(url)
        commit('SET_FILM', data)
      } catch(errosr) {
        console.log('ERRR111OR')
      }
  },
  async hoverFilm({ commit }, id) {
      try {
        let {data} = await this.$axios.get(this.$api.urls.getFilmsByHover + id)
        return data
      } catch(error) {
        console.log('ERRROR')
      }
  },
  async setMyFilms({commit}, params) {
    try {
      let {data} = await this.$axios.get(this.$api.urls.myFilms + params.type)
      commit('SET_MY_FILMS', {data: data, params: params.type})
    } catch(error) {
      console.log('ERRROR')
    }
  },
  async subscribeMyFilms({commit}, params) {
    try {
      let {data} = await this.$axios.post(params.url)
      return data
    } catch(error) {
      console.log('ERRROR')
    }
  },
  async setRecommendFilms({commit}, filmId) {
    try {
      let {data} = await this.$axios.get(this.$api.urls.getFilmsRecommend + filmId)

      if(data.ok)
        commit('SET_RECOMMEND_FILMS', data.data)

      else
        this.$toast.show(data.message)

    } catch(error) {
      console.log('ERRROR11')
    }
  }
}

export default { mutations, state, actions, getters }
