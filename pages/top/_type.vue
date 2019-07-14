<template>
  <section class="container">
    <h5>Топ фильмов по {{head.title}}</h5>
    <div v-if="films.data">
        <table class="centered">

          <thead>
            <tr>
              <th>№</th>
              <th>Название ленты</th>
              <th>Количество {{head.count_title}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(film, index) in films.data" :key="film.id">
              <td>{{index + 1}}</td>
              <td class="left">
                <nuxt-link :to="{name: 'films-id', params: {id: film.id}}" class="hover-underline">
                  <span>{{film.title}} ({{film.public_year}})</span>
                  <span v-if="film.qualities" class="black-text"> | {{film.qualities.name}}</span>
                  <span v-if="film.sound_qualities" class="black-text"> | {{film.sound_qualities.name}}</span>
                </nuxt-link>
              </td>
              <td v-if="$route.params.type == 'views'">{{film.views}}</td>
              <td v-if="$route.params.type == 'likes'">{{film.likes}}</td>
              <td v-if="$route.params.type == 'comments'">{{film.comments_count}}</td>
            </tr>
          </tbody>

        </table>
    </div>
  </section>
</template>

<script>
import Film from '~/components/films/Film.vue'

export default {
  components: {
    Film
  },
  fetch({ store, app, route }) {
    let url = app.$api.urls.top + route.params.type
    return store.dispatch('setFilms', url)
  },
  computed: {
    films() {
      let films = this.$store.state.films.films
      return films || []
    },
    head() {
      if(this.$route.params.type == 'views')
        return {
          title: 'просмотрам',
          count_title: 'просмотров'
        }
      else if(this.$route.params.type == 'likes')
        return {
          title: 'рейтингу',
          count_title: 'лайков'
        }
      else if(this.$route.params.type == 'comments')
        return {
          title: 'комментариям',
          count_title: 'комментариев'
        }
    }
  }
}
</script>

<style lang="scss">
  td {
    padding: 5px;
  }
</style>
