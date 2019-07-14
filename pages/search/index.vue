<template lang="html">
  <section>
    <search-page-form />
    <div class="result">
      <h5>Результаты по запросу: <strong>{{ searchText }}</strong></h5>
      <div v-if="result && result.films && result.films.data && result.films.data.length" class="films">
        <film
          v-for="film in result.films.data"
          :key="film.id"
          :film="film" />
      </div>
    </div>
  </section>
</template>

<script>
import SearchPageForm from '~/components/search/SearchPageForm.vue'
import Film from '~/components/films/Film.vue'

export default {
  components: { SearchPageForm, Film },

  fetch(context) {
    context.store.dispatch('setDetailResult', context.route.query.q)
  },

  watch: {
    '$route.query.q'() {
      this.changeSearchText( this.$route.query.q )
    }
  },

  computed: {
    result() {
      return this.$store.state.search.detailResult
    },
    searchText() {
      return this.$store.state.search.q
    }
  },

  methods: {
    changeSearchText(newSearchText) {
      this.$store.dispatch('setDetailResult', newSearchText)
    }
  }
}
</script>

<style lang="css">
</style>
