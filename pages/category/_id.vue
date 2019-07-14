<template>
  <section class="container">
    <film
      v-for="film in films.data"
      :key="film.id"
      :film="film" />
      <!-- <nuxt-link :to="{name: 'category-id', params: {id: 1}, query: {page: page + 1}}">NEXT</nuxt-link> -->
  </section>
</template>

<script>
import Film from '~/components/films/Film.vue'

export default {
  components: {
    Film
  },
  async fetch({ store, app, params, error }) {
    let url = app.$api.urls.getFilmsByCategory + params.id
    await store.dispatch('setFilms', url)
    if(!store.state.films.films.data)
      error({statusCode: 404})
  },
  computed: {
    films() {
      let films = this.$store.state.films.films
      return films || []
    },
  }
}
</script>

<style>

</style>
