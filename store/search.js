const state = () => ({
  q: '',
  simpleResult: {},
  detailResult: {},
  isLoading: false
})

const getters = {

}

const mutations = {
  SET_Q(state, data) {
    state.q = data
  },
  SET_SIMPLE_RESULT(state, data) {
    state.simpleResult = data
  },
  SET_DETAIL_RESULT(state, data) {
    state.detailResult = data
  },
  SET_IS_LOADING(state, data) {
    state.isLoading = data
  }
}

const actions = {
  async setQ({ commit, state }, data) {
      try {
        commit('SET_Q', data)
      } catch(error) {
        console.log('ERRROR')
      }
  },
  async setDetailResult({ commit, state }, searchText) {
      try {
        await commit('SET_IS_LOADING', true)
        await commit('SET_Q', searchText)

        let {data} = await this.$axios.get(this.$api.urls.search + state.q)

        if(data.ok)
          await commit('SET_DETAIL_RESULT', data)

        if(data.message)
          await this.$toast.show(data.message)

        await commit('SET_IS_LOADING', false)
      } catch(error) {
        await commit('SET_IS_LOADING', false)
        console.log('ERRROR')
      }
  }
}

export default { mutations, state, actions, getters }
