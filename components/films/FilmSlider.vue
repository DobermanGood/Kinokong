<template lang="html">
  <section v-if="category.films">
    <div class="head">
      <div class="flow-text title">
        <h4>
          {{category.name}}
        </h4>
      </div>
      <div class="links">
        <nuxt-link :to="{name: 'category-id', params: {id: category.id}}" class="btn waves-effect">
          Показать еще &nbsp; <i class="fa fa-arrow-circle-right"></i>
        </nuxt-link>
      </div>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
          <film
            v-for="film in category.films"
            :key="film.id"
            :film="film"></film>
      </div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </section>
</template>

<script>
import Film from '~/components/films/Film.vue'

export default {
  props: ['category'],
  components: {
    Film
  },
  data() {
    return {
      slider: {},
      // windowLoaded: false,
      swiperOption: {
        slidesPerView: 'auto', //this.slidesPerViewComputed,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            425: {
              slidesPerView: 1.8,
              spaceBetween: 10
            },
            420: {
              slidesPerView: 1.75,
              spaceBetween: 10
            },
            410: {
              slidesPerView: 1.7,
              spaceBetween: 10
            },
            400: {
              slidesPerView: 1.65,
              spaceBetween: 10
            },
            390: {
              slidesPerView: 1.6,
              spaceBetween: 10
            },
            365: {
              slidesPerView: 1.55,
              spaceBetween: 10
            },
            340: {
              slidesPerView: 1.4,
              spaceBetween: 10
            },
            330: {
              slidesPerView: 1.35,
              spaceBetween: 10
            }
          }
      }
    }
  },
  mounted() {
    this.windowLoaded = true
  },
  computed: {
    // slidesPerViewComputed() {
    //   if(this.windowLoaded)
    //     return $('.container').width() / 200
    //   return 4
    // }
  }
}
</script>

<style lang="scss" >
  .swiper-button-next {
    margin-left: 80px;
  }
  .swiper-slide {
    max-width: 180px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      padding-bottom: 0.75rem;
    }
  }
</style>
