<template lang="html">
  <div class="row">
    <!-- НАДО ПОДЕЛИТЬ ВСЕ НА РАЗНЫЕ КОМПОНЕНТЫ!!!! -->
    <div v-if="playlist.ok && playlist.films.length" class="playlist">
      <div class="playlist-sort">
        <h5 class="head-of-sort">{{playlist.playlist.name}}</h5>
        <button class='dropdown-trigger-playlist btn' data-target="playlist-sort">
          Сотировать <i class="fa fa-caret-down"></i>
        </button>
      </div>

      <ul id="playlist-sort" class='dropdown-content'>
        <li><a class="active">Все</a></li>
        <li><a>Не все)</a></li>
      </ul>

      <film v-for="film in playlist.films.data"
            :key="film.id"
            :film="film"
            class="col s12 m4"/>
    </div>
    <div v-else class="center empty-playlist">
      <p class="flow-text">
        {{playlist.message ? playlist.message : 'Плейлист пуст...'}}
      </p>
    </div>
  </div>
</template>

<script>
import Film from '~/components/films/Film.vue'

export default {
  components: {Film},
  middleware: 'auth',
  head() {
    return {
      title: `Плейлист ${this.$store.state.playlists.currentPlaylist.playlist.name}`
    }
  },
  mounted() {
    $('.dropdown-trigger-playlist').dropdown({
      constrainWidth: false
    })
  },
  async fetch({ store, app, params, error }) {
    if(store.state.playlists.currentPlaylist)
      if(store.state.playlists.currentPlaylist.playlist)
        if(store.state.playlists.currentPlaylist.playlist)
          if(store.state.playlists.currentPlaylist.playlist.id == params.id)
            return

    let url = app.$api.urls.getPlaylistsById + params.id
    await store.dispatch('setCurrentPlaylist', url)
  },
  computed: {
    playlist() {
      let playlist = this.$store.state.playlists.currentPlaylist
      return playlist || {}
    }
  },
}
</script>

<style lang="scss" scoped>
  .head-of-sort {
    display: inline-block;
    margin-right: 1rem;
  }
</style>
