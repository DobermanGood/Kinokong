import {urls, base} from '../common/api.js'

const state = () => ({
  comments: {},
  mainPageComments: [],
  isLoading: true
})

const getters = {
  userComments(state) {
    if(state.comments.data) {
      let comments = {...state.comments}

      comments.data = state.comments.data.filter(comment => {
        if(comment.films || comment.news) {
          return comment
        }
      })

      return comments
    }
  }
}

const mutations = {
  SET_MAIN_PAGE_COMMENTS(state, data) {
    state.mainPageComments = data
  },
  SET_COMMENTS(state, data) {
    state.comments = data
  },
  SET_IS_LOADING(state, data) {
    state.isLoading = data
  },
  ADD_COMMENTS_WITH_ALL_DATA(state, data) {
    data.data = state.comments.data.concat(data.data)
    state.comments = data
  },
  ADD_ONLY_COMMENTS(state, data) {
    state.comments.data = state.comments.data.concat(data)
  },
  ADD_COMMENT(state, data) {
    state.comments.data.push(data)
  },
  SET_COMMENT(state, data) {
    oldCommentIndex = state.comments.data.indexOf(
      state.comments.data.find(comment => {
        return comment.id == data.oldComment.id
      })
    )

    state.comments.data.splice(oldCommentIndex, 1, data.newComment)
  }
}

const actions = {
  async setComments({ commit, state }, url) {
      try {
        await commit('SET_IS_LOADING', true)
        await commit('SET_COMMENTS', {})

        let {data} = await this.$axios.get(url)

        await commit('SET_COMMENTS', data)
        commit('SET_IS_LOADING', false)
      } catch(error) {
        console.log('ERRROR')
      }
  },
  async addComments({ commit, state }, url) {
      try {
        let res = await this.$axios.get(url)
        await commit('ADD_COMMENTS_WITH_ALL_DATA', res.data)
      } catch(error) {
        return 'ERROR'
        console.log('ERRROR')
      }
  },
  async createComment({ commit, state }, params) {
      try {
        let res = await this.$axios.post(params.url, params.data)
        await commit('ADD_COMMENT', res.data.data)
        this.$toast.show(res.data.message)
      } catch(error) {
        if(error == 'Error: Request failed with status code 422') {
          this.$toast.show('Вероятно количество символов превышено')
        }
        console.log('ERRROR')
      }
  },
  async setCommentChilds({ commit, state }, parentId) {
      try {
        let res = await this.$axios.get(this.$api.urls.getParentComments + parentId)
        if(res.data.next_page_url) {
          res.data.data[res.data.data.length - 1].next_page_url = await res.data.next_page_url
        }
        await commit('ADD_ONLY_COMMENTS', res.data.data)
        return {ok: true}
      } catch(error) {
        console.log('ERRROR222')
      }
  },
  async loadCommentChilds({ commit, state }, url) {
      try {
        let res = await this.$axios.get(url)
        if(res.data.next_page_url) {
          res.data.data[res.data.data.length - 1].next_page_url = res.data.next_page_url
        }
        await commit('ADD_COMMENTS', res.data.data)
      } catch(error) {
        console.log('ERRROR333')
      }
  },
  async setComment({ commit, state }, params) {
      try {
        await commit('SET_COMMENT', params)
      } catch(error) {
        console.log('ERRROR')
      }
  }
}

export default { mutations, state, actions, getters }
