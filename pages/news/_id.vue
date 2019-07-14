<template lang="html">
  <div class="film">
      <div class="parallax-container">
          <div class="parallax">
            <img :src="film.image_link.original">
          </div>
      </div>
      <div class="section white">
          <div class="row container">
              <h2 class="header">{{ film.title }}</h2>
              <p v-html="film.content" class="grey-text text-darken-3 lighten-3"></p>
          </div>
      </div>
      <div class="film-comments">
        <comments :comments="comments"></comments>
      </div>
  </div>
</template>

<script>
import Comments from '~/components/comments/Comments.vue'

export default {
  components: { Comments },
  async fetch({ store, app, params, error }) {
    let url = app.$api.urls.getFilmsById + params.id
    await store.dispatch('setFilm', url)
    if(!store.state.films.currentFilm.id)
      error({statusCode: 404})
  },
  computed: {
    film() {
      let film = this.$store.state.films.currentFilm
      return film || []
    }
  },
  mounted() {
    $('.parallax').parallax();
    if(this.film) {
      this.$store.dispatch('setComments', {
        params: {
          filmId: this.film.id
        }
      })
    }
  },
}
</script>

<style lang="scss">
  .parallax img {
      opacity: 1;
  }
</style>
