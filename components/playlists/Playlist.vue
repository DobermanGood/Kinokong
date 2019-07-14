<template lang="html">
  <div class="playlist">
    <button @click="showModal()" data-target="playlist-modal" class="btn-floating btn-small waves-effect waves-light hoverable modal-trigger playlist-show-button">
      <i class="fa fa-plus"></i>
    </button>

    <div v-if="showPlaylist" id="playlist-modal" class="modal">
      <div class="modal-content">
        <h4>Сохранить в...</h4>
        <playlist-list :playlists="playlists"/>
      </div>
      <div class="modal-footer">
        <playlist-form />
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistList from './PlaylistList.vue'
import PlaylistForm from './PlaylistForm.vue'

export default {
  components: {PlaylistList, PlaylistForm},
  data() {
    return {
      showPlaylist: false
    }
  },
  computed: {
    playlists() {
      let playlists = this.$store.state.playlists.playlists
      return playlists || []
    }
  },
  methods: {
    async showModal() {
      if(!this.$auth.loggedIn)
        return this.$toast.show('Плейлисты доступны только зарегистрированным пользователям')

      this.showPlaylist = await true
      await this.$nextTick()
      await $('#playlist-modal').modal()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
