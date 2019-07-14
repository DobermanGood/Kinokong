<template lang="html">
  <div class="row film">
      <div class="col s12 m4 l3">
        <left-side :film="film"></left-side>
      </div>
      <div class="col s12 m8 l9">
        <right-side :film="film"></right-side>
      </div>
      <div class="col s12 film-comments">
        <comments :commentsFormTo="commentsFormTo"></comments>
      </div>
  </div>
</template>

<script>
import Comments from '~/components/comments/Comments.vue'
import LeftSide from '~/components/films/filmDetail/LeftSide.vue'
import RightSide from '~/components/films/filmDetail/RightSide.vue'

export default {
  components: { Comments, LeftSide, RightSide },
  head() {
    return {
      title: `${this.film.title} (${this.film.public_year})`
    }
  },
  data() {
    return {
      commentsFormTo: {}
    }
  },
  async fetch({ store, app, params, error }) {
    if(store.state.films.currentFilm)
      if(store.state.films.currentFilm.id == params.id)
        return

    let url = app.$api.urls.getFilmsById + params.id
    await store.dispatch('setFilm', url)
    if(!store.state.films.currentFilm.id)
      error({statusCode: 404})
  },
  computed: {
    film() {
      let film = this.$store.state.films.currentFilm
      return film || {}
    }
  },
  mounted() {
    $('.parallax').parallax();
    if(this.film) {
      let url = this.$api.urls.getFilmComments + this.film.id
      this.$store.dispatch('setComments', url)
      this.commentsFormTo = {name: 'film', id: this.film.id}
    }
  },
}
</script>

<style lang="scss">
  .parallax img {
      opacity: 1;
  }
</style>
