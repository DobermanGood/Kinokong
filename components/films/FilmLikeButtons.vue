<template lang="html">
  <div class="actions">
    <button @click="like()"
            :class="{green: film.isLiked, 'white-text': film.isLiked, grey: !film.isLiked}"
            class="btn waves-effect lighten-2 green-text"
            :title="likeTitle">
            <i class="fa fa-thumbs-up"></i> {{film.likes}}
    </button>
    <button @click="dislike()"
            :class="{red: film.isdisLiked, 'white-text': film.isdisLiked, grey: !film.isdisLiked}"
            class="btn waves-effect lighten-2 red-text"
            :title="dislikeTitle">
            <i class="fa fa-thumbs-down dislike-icon"></i> {{film.dislikes}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    film: Object
  },
  computed: {
    likeTitle() {
      if(this.film.isLiked)
        return 'Убрать лайк и удалить из понравившихся'
      return 'Поставить лайк и добавить в понравившиеся'
    },
    dislikeTitle() {
      if(this.film.isdisLiked)
        return 'Убрать дизлайк'
      if(this.film.isLiked)
        return 'Поставить дизлайк и удалить из понравившихся'

      return 'Поставить дизлайк'
    }
  },
  methods: {
    async like() {
      if(!this.$auth.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      await this.$store.dispatch('likeFilm', this.film.id)
              .then(res => {
                if(res.ok === true) {
                  if(res.is) {
                    this.film.likes = res.is.likes
                    this.film.dislikes = res.is.dislikes
                    this.film.isLiked = res.is.isLiked
                    this.film.isdisLiked = res.is.isdisLiked
                  }

                  if(res.message)
                    this.$toast.show(res.message)
                  else
                    this.$toast.show('Добавлен в список понравившихся')

                }

                else
                  this.$toast.show(res.message)
              })
    },

    async dislike() {
      if(!this.$auth.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      await this.$store.dispatch('dislikeFilm', this.film.id)
              .then(res => {
                if(res.ok === true) {
                  if(res.is) {
                    this.film.likes = res.is.likes
                    this.film.dislikes = res.is.dislikes
                    this.film.isLiked = res.is.isLiked
                    this.film.isdisLiked = res.is.isdisLiked
                  }

                  if(res.message)
                    this.$toast.show(res.message)
                  else
                    this.$toast.show('Поставлена отметка "не нравиться"')
                }

                else
                  this.$toast.show(res.message)
              })
    }
  }
}
</script>

<style lang="scss" scoped>
  .actions {
    justify-content: center;
    display: flex;
    button {
      width: 50%;
      .dislike-icon {
        transform: rotateY(180deg);
      }
    }
  }
</style>
