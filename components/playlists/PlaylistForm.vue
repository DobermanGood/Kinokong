<template lang="html">
  <div class="playlist-form">
    <button v-if="!isCreatingPlaylist" @click="isCreatingPlaylist = true" class="waves-effect waves-green btn-flat">
      Создать новый плейлист &#10010;
    </button>
    <form v-else @submit.prevent="createPlaylist()" class="playlist-create-form">
      <div class="input-field">
        <input v-model="newPlaylistName" :autofocus="{'autofocus': isCreatingPlaylist}" id="playlist_create_first_name" type="text" class="validate" required>
        <label :class="{active: isCreatingPlaylist}" for="playlist_create_first_name">Название</label>
      </div>
      <div class="actions">
        <button @click="isCreatingPlaylist = false" class="btn-flat">Отмена</button>
        <button type="submit" class="btn blue">Создать</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreatingPlaylist: false,
      newPlaylistName: ''
    }
  },
  methods: {
    createPlaylist() {
      this.playlists.push(1)
      this.isCreatingPlaylist = false
      this.$toast.show(`Фильм добавлен в плейлист ${this.newPlaylistName}`)
      this.newPlaylistName = ''
    },
    change() {
      this.$toast.show(`Фильм добавлен в плейлист ${this.newPlaylistName}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  form.playlist-create-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    flex-wrap: wrap;
    .input-field {
      flex-grow: 1;
      margin: 0 1rem 0 0;
    }
  }
</style>
