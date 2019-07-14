<template>
  <section>
    <film-slider
      v-for="category in categories"
      :key="category.id"
      :category="category"></film-slider>
    <div class="col s12 l7 news">
      <news-block :news="news"></news-block>
    </div>
    <div class="col s12 l5 comments">
      <comments-block :comments="mainPageComments"></comments-block>
    </div>
  </section>
</template>

<script>
import FilmSlider from '~/components/films/FilmSlider.vue'
import NewsBlock from '~/components/news/mainPageBlock.vue'
import CommentsBlock from '~/components/comments/mainPageBlock.vue'
import {urls} from '../common/api.js'

export default {
  components: {
    FilmSlider, NewsBlock, CommentsBlock
  },
  async fetch({ store, app }) {
    if(store.state.categories.categories.length)
      return

    const {data} = await app.$axios.get(urls.getMain)
    await store.commit('SET_CATEGORIES', data.categories)
    await store.commit('SET_NEWS', data.news)
    await store.commit('SET_MAIN_PAGE_COMMENTS', data.comments)
  },
  computed: {
    categories() {
      let categories = this.$store.state.categories.categories
      return categories || []
    },
    news() {
      let news = this.$store.state.news.news
      return news || []
    },
    mainPageComments() {
      let comments = this.$store.state.comments.mainPageComments
      return comments || []
    }
  }
}
</script>

<style lang="scss">
</style>
