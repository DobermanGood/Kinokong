<template lang="html">
  <div v-show="showTooltip" class="tooltip">
    <div v-if="loaded && film" class="tooltip-info">
      <div class="tooltip-head">
        <div class="left">
          <i v-if="film.categories" v-for="category in film.categories" :key="category.id" class="category">
            {{ category.name }}
          </i>
        </div>
        <span class="green-text date">{{film.created_at}}</span>
      </div>
      <div class="tooltip-body">
        <p class="text">{{ film.excerpt | shortText(150) }}</p>
        <button v-if="film.qualities" class="btn qualities red">{{film.qualities.name}}</button>
      </div>
    </div>
    <div v-else class="tooltip-info">
      Загружаю...
    </div>
    <div v-if="error.message" class="tooltip-info">
      {{error.message}}
    </div>
  </div>
</template>

<script>
import filters from '~/mixins/filters.js'

export default {
  props: ['showTooltip', 'film', 'error', 'loaded'],
  mixins: [filters]
}
</script>

<style lang="scss" scoped>
  .tooltip {
    position: absolute;
    top: 23%;
    left: 7%;
    height: 100%;
    width: 100%;
    .tooltip-info {
      background-color: #e0e0e0;
      padding: 10px 15px;
      border-radius: 3px;
      z-index: 5;
      position: absolute;
    }
    .tooltip-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tooltip-body {
      word-wrap: break-word;
      .qualities {
        margin-left: -1px;
      }
    }
  }
</style>
