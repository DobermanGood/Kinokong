<template lang="html">
  <div class="right-side">
    <div class="flow-text title">
      {{film.title}} ({{film.public_year}})
    </div>

    <v-film-subscribe-buttons :film="film" :info="additionalFilm.info" />
    <playlist />

    <div class="created_at">
      <i>Добавлен: {{film.created_at}}</i>
    </div>
    <div class="content">
      {{film.content}}
    </div>
    <div class="video-container">
      <ul class="tabs">
        <li class="tab"><a class="active" href="#video-film">Фильм</a></li>
        <li class="tab"><a href="#video-trailer">Трейлер</a></li>
      </ul>
      <div id="video-film">
        <div class="video-player-box"
             :playsinline="playsinlineFilm"
             @canplay="onPlayerCanplay($event)"
             @play="onPlayerPlaying($event)"
             v-video-player:filmVideoPlayer="playerOptionsFilm">
        </div>
      </div>
      <div id="video-trailer">
        <div class="video-player-box"
             :playsinline="playsinlineTrailer"
             v-video-player:trailerVideoPlayer="playerOptionsTrailer">
        </div>
      </div>
    </div>
    <div class="extra-images">
      <div v-if="film.extra_images_link"
           v-for="(image, index) in film.extra_images_link"
           :key="index">
        <a :href="image" target="_blank" rel="noopener">
          <img :src="image" :alt="'Аватар для ' + film.title" :title="film.title">
        </a>
      </div>
    </div>
    <div v-if="factsShowed.length" class="facts">
      <div class="head">
        <h6 class="orange-text">
          ИНТЕРЕСНЫЕ ФАКТЫ О ФИЛЬМЕ {{film.title}}
        </h6>
        <small>
          СПИСОК ФАКТОВ О ФИЛЬМЕ МОЖЕТ СОДЕРЖАТЬ СПОЙЛЕРЫ. БУДЬТЕ ОСТОРОЖНЫ.
        </small>
      </div>
      <div class="content">
        <div v-for="fact in factsShowed"
             :key="fact.id"
             class="fact card-panel">
          {{fact.content}}
        </div>
        <div class="center">
          <button v-if="factsShowed.length > 2" @click="showFacts = !showFacts" class="btn">
            {{ showFacts ? 'Скрыть факты' : 'Показать еще факты' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="hasRecommendFilms" class="recommend-films">
      <div class="head">
        <h6 class="center-align orange-text">
          Рекомендуем
        </h6>
      </div>
      <div class="content">
        <film v-for="recommentdFilm in film.recommendFilms"
        :key="recommentdFilm.id"
        :film="recommentdFilm"
        :isSimpleCard="true" />
      </div>
    </div>
  </div>
</template>

<script>
import vFilmSubscribeButtons from '../FilmSubscribeButtons.vue'
import Film from '../Film.vue'
import Playlist from '../../playlists/Playlist.vue'

export default {
  props: ['film'],
  components: {vFilmSubscribeButtons, Film, Playlist},
  async mounted() {
    await $('.tabs').tabs()
    await this.checkSubscribeButtons()
    await this.setRecommendFilms()
  },
  data() {
    return {
      showFacts: false,
      additionalFilm: {},

      playsinlineFilm: true,
      playerOptionsFilm: {
        muted: false,
        language: 'ru',
        playbackRates: [0.25, 0.5, 0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: this.film.video_link.download_link
        }],
        fluid: true,
        responsive: true,
        poster: this.film.image_link.original
      },

      playsinlineTrailer: true,
      playerOptionsTrailer: {
        muted: false,
        language: 'ru',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: this.film.trailer_link.download_link
        }],
        fluid: true,
        responsive: true,
        poster: this.film.image_link.original
      }
    }
  },
  computed: {
    factsShowed() {
      return this.showFacts ? this.film.facts : this.film.facts.slice(0,3)
    },
    hasRecommendFilms() {
      if(this.film.recommendFilms)
        return this.film.recommendFilms.length > 0
      return false
    }
  },
  methods: {
    checkSubscribeButtons() {
      this.$store.dispatch('hoverFilm', this.film.id)
        .then(res => {
          this.additionalFilm = res
        })
    },
    setRecommendFilms() {
      this.$store.dispatch('setRecommendFilms', this.film.id)
    },
    onPlayerCanplay(player) {
      $('.vjs-big-play-button').css({top: 'calc(50% - 0.5em)', left: 'calc(50% - 1.5em)'})
    },
    onPlayerPlaying(player) {
      this.$axios.get(this.$api.base + 'ip').then(res => console.log(res))
    }
  }
}
</script>

<style lang="scss" scoped>
  .vjs-big-play-button {
    top: calc(50% - 0.5em);
    left: calc(50% - 1.5em);
  }
  .right-side {
    .title {
      margin-bottom: 1rem;
    }
    .subscribe-buttons, .playlist {
      display: inline-block;
    }
    .content {
      margin: 1rem 0;
    }
    .video-container {
      overflow: visible;
      height: auto;
      padding-bottom: 1rem;
      #video-film {
        max-width: 100%;
      }
    }
    .extra-images {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 1rem;
      a {
        margin: .5rem;
      }
    }
    .facts {
      margin-top: 2rem;
      .head {
        text-transform: uppercase;
        display: block;
      }
      .content {
        .fact {
          border-left: 3px solid #ef9a9a;
        }
      }
    }
    .recommend-films {
      margin-top: 3rem;
      .head {
        text-transform: uppercase;
        display: block;
      }
      .content {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        div {
          width: 110px;
          margin: 0 5px;
        }
      }
    }
  }
</style>
