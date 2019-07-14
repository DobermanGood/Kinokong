<template lang="html">
    <div :class="{'swiper-slide slide' : !isSimpleCard}">
      <div class="film-info">
        <img v-if="!isSimpleCard" @mouseover="hoverFilm()" :src="film.image_link.cropped" :alt="'Аватар к ' + film.title" :title="film.title">
        <nuxt-link v-else :to="{name: 'films-id', params: {id: film.id}}" :title="film.title" class="black-text">
          <img :src="film.image_link.cropped" :alt="'Аватар к ' + film.title" :title="film.title">
        </nuxt-link>
        <v-film-info v-if="!isSimpleCard"
                     :error="error"
                     :film="additionalFilm.film"
                     :info="additionalFilm.info"
                     :id="film.id"
                     :loaded="moreInfoLoaded"></v-film-info>
      </div>
      <v-film-like-buttons v-if="!isSimpleCard" :film="film"/>
      <p class="center truncate title">
        <nuxt-link :to="{name: 'films-id', params: {id: film.id}}" :title="film.title" class="black-text">
          {{film.title}} ({{film.public_year}})
        </nuxt-link>
      </p>
    </div>
</template>

<script>
import vHeader from '~/components/Header/Header.vue'
import vFilmInfo from '~/components/films/FilmInfo.vue'
import vFilmLikeButtons from './FilmLikeButtons.vue'

export default {
  props: {
    film: Object,
    isSimpleCard: false
  },
  components: {vHeader, vFilmInfo, vFilmLikeButtons},
  data() {
    return {
      additionalFilm: {},
      error: {},
      hovered: false,
      infoLoaded: false
    }
  },
  methods: {
    async hoverFilm() {
      if(!this.hovered) {
        this.$nextTick(() => {
          this.hovered = true
        })
        await this.$store.dispatch('hoverFilm', this.film.id)
          .then(res => {
            if(res.film === null) {
              this.error = {message: 'Ошибка при загрузке...'};
            }
            this.additionalFilm = res
          }) .catch(error => {
            this.error.message = error.message
          })
        this.infoLoaded = true
      }
    }
  },
  computed: {
    moreInfoLoaded() {
      return this.infoLoaded
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide {
    min-width: 180px;
    max-width: 180px;
    display: inline-block;
    margin: 0 20px;
  }
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
        filter: brightness(50%);
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
</style>
