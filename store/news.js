import {urls, base} from '../common/api.js'

const state = () => ({
  news: [],
})

const getters = {}

const mutations = {
  SET_NEWS(state, data) {
    state.news = data
  },
}

const actions = {

}

export default { mutations, state, actions, getters }
