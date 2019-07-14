<template>
    <div v-if="news">
      <div class="head">
        <div class="flow-text title">
          <h4>Новости кино</h4>
        </div>
        <div class="links">
          <nuxt-link :to="{name: 'news'}" class="btn waves-effect">
            Показать еще &nbsp; <i class="fa fa-arrow-circle-right"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="content">
        <nuxt-link :to="{name: 'news-id', params: {id: newsItem.id}}" v-for="newsItem in news" :key="newsItem.id" class="col m6 card hoverable">
          <div class="card-image">
            <img :src="newsItem.image_link.cropped">
            <div class="hoverEffect"></div>
            <span class="card-title">{{newsItem.title}}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
</template>

<script>
export default {
  props: ['news'],
}
</script>

<style lang="scss" scoped>
  .content {
    .card {
      padding: 0;
      border: none;
      .card-image {
        .hoverEffect {
          background-color: rgba(0,0,0,.3);
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
      .card-title {
        font-size: 1rem;
        padding-bottom: 15px;
      }
    }
  }
</style>
