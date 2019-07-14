<template lang="html">
  <div class="film-actions">
    <button @mouseover="showTooltip = true"
            @mouseout="showTooltip = false"
            @click="showTooltip = !showTooltip"
            class="btn-floating btn-small hoverable info tooltip-target b3">
      <i class="fa fa-info"></i>
    </button>

    <v-film-info-tooltip :showTooltip="showTooltip"
                         :error="error"
                         :loaded="loaded"
                         :film="film" />

    <v-film-subscribe-buttons :film="film" :info="info" />

    <nuxt-link :to="{name: 'films-id', params: {id: id}}" class="btn-floating hoverable btn-large play">
      <i v-show="loaded && !loading" class="fa fa-play"></i>
      <i v-show="!loaded || loading" class="fa fa-spinner loading"></i>
    </nuxt-link>
  </div>
</template>

<script>
import vFilmSubscribeButtons from './FilmSubscribeButtons.vue'
import vFilmInfoTooltip from './FilmInfoTooltip.vue'

export default {
  props: ['film', 'info', 'error', 'id', 'loaded'],
  components: {vFilmSubscribeButtons, vFilmInfoTooltip},
  data() {
    return {
      loading: false,
      showTooltip: false
    }
  }
}
</script>

<style lang="scss">
  @keyframes loading {
    from {transform: rotateZ(0deg);}
    to {transform: rotateZ(360deg);}
  }
  .film-actions {
    $top: 7%;
    $left: 7%;
    opacity: 0;
    .info {
      position: absolute;
      top: $top;
      left: $left;
    }
    .favourite {
      position: absolute;
      left: $left;
      top: $top * 3.5;
    }
    .bookmark {
      position: absolute;
      left: $left;
      top: $top * 6;
    }
    .viewed {
      position: absolute;
      left: $left;
      top: $top * 8.5;
    }
    .play {
      position: absolute;
      left: 35%;
      top: 45%;
      i {
        transform: translateX(3px);
      }
      .loading {
        animation: loading 1s infinite linear;
      }
    }
  }
</style>
