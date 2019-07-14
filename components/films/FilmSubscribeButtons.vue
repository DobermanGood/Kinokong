<template lang="html">
  <div class="subscribe-buttons">
    <button @click="subscribe('favourite')" v-if="!isFavourite" title="Добавить в мои закладки" class="btn-floating btn-small waves-effect waves-light hoverable favourite"><i class="fa fa-heart"></i></button>
    <button @click="unsubscribe('favourite')" v-else title="Удилить из моих закладкок" class="btn-floating btn-small waves-effect hoverable favourite red"><i class="fa fa-heart"></i></button>

    <button @click="subscribe('bookmark')" v-if="!isBookmark" title="Добавить в список посмотреть позже" class="btn-floating btn-small waves-effect waves-light hoverable bookmark"><i class="fa fa-eye"></i></button>
    <button @click="unsubscribe('bookmark')" v-else title="Удалить из списка посмотреть позже" class="btn-floating btn-small waves-effect hoverable bookmark red"><i class="fa fa-eye"></i></button>

    <button @click="subscribe('viewed')" v-if="!isViewed" title="Добавить в список просмотренных" class="btn-floating btn-small waves-effect waves-light hoverable viewed"><i class="fa fa-check"></i></button>
    <button @click="unsubscribe('viewed')" v-else title="Удалить из списка просмотренных" class="btn-floating btn-small waves-effect hoverable viewed red"><i class="fa fa-check"></i></button>
  </div>
</template>

<script>
export default {
  props: ['film', 'info'],
  computed: {
    isFavourite() {
      if(this.info)
        return this.info.find(item => {
          return item.type == 'favourite'
        })
    },
    isBookmark() {
      if(this.info)
        return this.info.find(item => {
          return item.type == 'bookmark'
        })
    },
    isViewed() {
      if(this.info)
        return this.info.find(item => {
          return item.type == 'viewed'
        })
    }
  },
  methods: {
    async subscribe(type) {
      if(!this.$auth.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      this.$nextTick(() => {
        this.loading = true
      })
      let url = `${this.$api.urls.subscribeMyFilms}${type}/${this.film.id}`
      await this.$store.dispatch('subscribeMyFilms', {url})
        .then(res => {
          if(res.ok === true) {
            this.info.push({type})
          }
          this.$toast.show(res.message)
        })
      this.loading = false
    },

    async unsubscribe(type) {
      if(!this.$auth.loggedIn) {
        this.$toast.show('Вы не зарегистрированы')
        return
      }

      this.$nextTick(() => {
        this.loading = true
      })
      let url = `${this.$api.urls.unsubscribeMyFilms}${type}/${this.film.id}`
      await this.$store.dispatch('subscribeMyFilms', {url})
        .then(res => {
          if(res.ok === true) {
            this.info.splice(this.info.indexOf(
              this.info.find(item => {
                return item.type == type
              })
            ), 1)
          }

          this.$toast.show(res.message)
        })
      this.loading = false
    }
  }
}
</script>

<style lang="css">
</style>
