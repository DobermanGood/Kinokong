<template lang="html">
  <section>
    <div class="head">
      <div class="flow-text title">
        <h4>
          Фильмы
        </h4>
      </div>
      <div class="links">
        <nuxt-link :to="" class="btn waves-effect">
          Show More &nbsp; <i class="fa fa-arrow-circle-right"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="body">
      <div class="my-slider">
        <film
          v-for="film in films"
          :key="film.id"
          :film="film"></film>
      </div>
    </div>
  </section>
</template>

<script>
import Film from '~/components/films/Film.vue'
import axios from 'axios'

const url = 'http://jsonplaceholder.typicode.com/photos'

export default {
  props: ['category'],
  data() {
    return {
      films: []
    }
  },
  components: {
    Film
  },
  mounted() {
    axios.get(url + '?albumId=' + this.category.id + '&_limit=5')
      .then(res => {
        this.films = res.data
      })
    const slider = tns({
    "container": '.my-slider',
    "items": 3,
    "mouseDrag": true,
    "slideBy": "page",
    "speed": 400,
    "cloneCount": 0
    });
  }
}
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      padding-bottom: 0.75rem;
    }
  }
  .tns-controls, .tns-nav {
    display: none;
  }
</style>
