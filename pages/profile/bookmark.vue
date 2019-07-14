<template>
  <section class="container">
    <film
      v-for="film in films.data"
      :key="film.id"
      :film="film"></film>
    </section>
</template>

<script>
import Film from '~/components/films/Film.vue'

export default {
  middleware: 'auth',
  components: {
    Film
  },
  fetch({ store }) {
    return store.dispatch('setMyFilms', {
      type: 'bookmark'
    })
  },
  computed: {
    films() {
      let films = this.$store.state.films.myFilms.bookmark
      return films || []
    }
  }
}
</script>

<style>

</style>
