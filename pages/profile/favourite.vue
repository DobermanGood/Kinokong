<template>
  <section class="container">
    <div v-if="films.data">
      <film
        v-for="film in films.data"
        :key="film.id"
        :film="film"></film>
    </div>
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
      type: 'favourite'
    })
  },
  computed: {
    films() {
      let films = this.$store.state.films.myFilms.favourite
      return films || []
    }
  }
}
</script>

<style>

</style>
