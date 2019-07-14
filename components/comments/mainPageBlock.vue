<template>
    <div v-if="comments">
      <div class="head">
        <div class="flow-text title">
          <h4>Последние Комментарии</h4>
        </div>
      </div>
      <div class="content">
        <ul id="main-page-comments-list" class="collection">
          <li v-for="comment in comments" :key="comment.id" class="collection-item avatar">
            <a href="#">
              <img class="circle" :src="comment.user.avatar" :alt="comment.user.name" :title="comment.user.name">
            </a>
            <nuxt-link :to="{ name: 'films-id', params: {id: comment.films[0].id} }" class="title truncate">{{comment.films[0].title}}</nuxt-link>
            <p>{{comment.content | shortText(80)}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import filters from '~/mixins/filters.js'

export default {
  props: ['comments'],
  mixins: [filters],
  mounted() {
    if(window.innerWidth >= 993) {
      let newsBlockHeight = $('.news').height();
      $('#main-page-comments-list').css({"height": newsBlockHeight});
    }
  }
}
</script>

<style lang="scss" scoped>
  .collection {
    overflow-y: scroll;
    max-height: 70vh;
  }
</style>
