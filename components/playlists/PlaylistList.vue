<template lang="html">
  <div class="playlist-list">
    <div v-if="!isLoading">
      <div v-if="playlists.length" class="label-list">
        <label v-for="playlist in playlists" :key="playlist.id">
          <input @change="change()" type="checkbox" class="filled-in" checked="checked" />
          <span>{{playlist.name}}</span>
        </label>
      </div>
      <p class="empty-playlist" v-else>
        У вас пока нет плейлистов...
      </p>
    </div>
    <loader v-else />
  </div>
</template>

<script>
import Loader from '../Loader.vue'

export default {
  components: {Loader},
  props: ['playlists'],
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.setPlaylists()
  },
  methods: {
    async setPlaylists() {
      let url = await this.$api.urls.getPlaylistsByUser + this.$auth.user.id

      await this.$store.dispatch('setPlaylists', url)

      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .label-list {
    padding-left: 5px;
    label {
      display: block;
      margin: 10px 0;
    }
  }
  .empty-playlist {
    padding-left: 5px;
  }
</style>
