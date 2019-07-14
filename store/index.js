import Vuex from 'vuex'
import films from './films.js'
import categories from './categories.js'
import comments from './comments.js'
import tags from './tags.js'
import news from './news.js'
import likes from './likes.js'
import playlists from './playlists.js'
import search from './search.js'

const createStore = () => {
  return new Vuex.Store({
    modules: { films, categories, comments, tags, news, likes, playlists, search }
  })
}

export default createStore
