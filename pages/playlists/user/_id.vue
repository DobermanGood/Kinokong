<template lang="html">
  <div class="row">
    <div v-if="playlists.length" class="playlists">
      <div class="playlist-sort">
        <h5 class="head-of-sort">Мои плейлисты</h5>
        <button class='dropdown-trigger-playlist btn' data-target="playlist-sort">
          Сотировать <i class="fa fa-caret-down"></i>
        </button>
      </div>

      <ul id="playlist-sort" class='dropdown-content'>
        <li><a class="active">Все</a></li>
        <li><a>Не все)</a></li>
      </ul>
      <div v-for="playlist in playlists" :key="playlist.id" class="col s12 m4">
        <div class="card">
          <div class="card-image">
            <a class='dropdown-trigger-playlist right more-actions pointer' :data-target="'playlist-options-'+playlist.id">
              <span></span>
              <span></span>
              <span></span>
            </a>

            <ul :id="'playlist-options-'+playlist.id" class='dropdown-content'>
              <li><a>Удалить</a></li>
              <li><a>Добавить</a></li>
            </ul>
            <nuxt-link :to="{name: 'playlists-playlist-id', params: {id: playlist.id}}" :title="playlist.name">
              <img :src="playlist.image_link.cropped" class="image-darken">
              <span class="card-title">{{playlist.name}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="center empty-playlist">
      <p class="flow-text">
        Список плейлистов пуст...
      </p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: `Плейлисты пользователя ${this.$store.state.playlists.playlists.user.name}`
    }
  },
  mounted() {
    $('.dropdown-trigger-playlist').dropdown({
      constrainWidth: false
    })
  },
  async fetch({ store, app, params, error }) {
    let url = app.$api.urls.getPlaylistsByUser + params.id
    await store.dispatch('setPlaylists', url)
  },
  computed: {
    playlists() {
      let playlists = this.$store.state.playlists.playlists.result.data
      return playlists || {}
    }
  },
}
</script>

<style lang="scss" scoped>
.head-of-sort {
  display: inline-block;
  margin-right: 1rem;
}
.card-image {
  color: red;
  position: relative;
  .more-actions {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 55px;
    z-index: 2;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #ddd;
      margin: 1px;
    }
    &:hover {
      span {
        background-color: #fff;
      }
    }
  }
  .image-darken {
    position: relative;
    filter: brightness(50%);
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: blue;
    }
  }
}
</style>
