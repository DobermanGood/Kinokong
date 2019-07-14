<template lang="html">
    <div class="swiper-slide slide">
      <div class="film-info">
        <img @mouseover="hoverFilm()" :src="film.image_link.cropped" :alt="film.title">
        <v-film-info :error="error" :film="additionalFilm.film" :info="additionalFilm.info" :id="film.id"></v-film-info>
      </div>
      <div class="actions">
        <button @click="rate('like')" class="btn waves-effect grey lighten-2 green-text"><i class="fa fa-thumbs-up"></i> {{film.likes}}</button>
        <button class="btn waves-effect grey lighten-2 red-text"><i class="fa fa-thumbs-down"></i> {{film.dislikes}}</button>
      </div>
      <p class="center truncate title">
        <nuxt-link :to="{name: 'films-id', params: {id: film.id}}" class="black-text">
          {{film.title}} ({{film.public_year}})
        </nuxt-link>
      </p>
    </div>
</template>

<script>
import vHeader from '~/components/Header/Header.vue'
import vFilmInfo from '~/components/films/FilmInfoTooltip.vue'


export default {
  props: ['film'],
  components: {vHeader, vFilmInfo},
  data() {
    return {
      additionalFilm: {},
      error: {},
      hovered: false
    }
  },
  methods: {
    hoverFilm() {
      if(!this.hovered) {
        this.$nextTick(() => {
          this.hovered = true
        })
        this.$store.dispatch('hoverFilm', this.film.id)
        .then(res => {
          if(res.film === null) {
            this.error = {message: 'Ошибка при загрузке...'};
          }
          this.additionalFilm = res
        }) .catch(error => {
          this.error.message = error.message
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide {
    width: auto;
    display: inline-block;
    margin: 0 20px;
    .title {
      font-weight: 600;
      :hover {
        text-decoration: underline;
      }
    }
    .film-info {
      position: relative;
      transition: .25s;
      &:hover {
        img {
          opacity: .5;
        }
        .film-actions {
          opacity: 1;
        }
      }
      img {
        max-width: 100%;
        transition: .25s;
        cursor: pointer;
      }
    }
    .actions {
      justify-content: center;
      display: flex;
      button {
        width: 50%;
      }
    }
  }
</style>
