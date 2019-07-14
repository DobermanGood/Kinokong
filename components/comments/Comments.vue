<template lang="html">
    <section class="comments-container">
      <comments-head></comments-head>
      <comment-form :formTo="commentsFormTo"></comment-form>
      <div v-if="$store.state.comments.isLoading" class="center comments-is-loading">
        <loader></loader>
      </div>
      <comment-single v-if="comments.data"
               v-for="commentValue in comments.data"
              :key="commentValue.id"
              :comment="commentValue"
              :depth="0" />
      <div v-if="comments.data">
        <div v-if="!comments.data.length && !isLoading" class="comments-not-found">
          <h5 class="center">Комментариев нет</h5>
        </div>
      </div>
      <div v-if="comments.next_page_url" class="center">
        <button @click.stop="loadMore()" :class="{disabled: moreLoading}" class="btn">Загрузить еще</button>
      </div>
    </section>
</template>

<script>
import CommentSingle from './Comment.vue'
import CommentForm from './CommentForm.vue'
import CommentsHead from './CommentsHead.vue'
import Loader from '../Loader.vue'

export default {
  components: { CommentSingle, CommentForm, CommentsHead, Loader },
  props: ['commentsFormTo'],
  data() {
    return {
      moreLoading: false
    }
  },
  computed: {
    comments() {
      let comments = this.$store.state.comments.comments
      return comments || []
    },
    isLoading() {
      return this.$store.state.comments.isLoading
    },
  },
  methods: {
    async loadMore() {
      this.$nextTick(() => {
        this.moreLoading = true
      })
      await this.$store.dispatch('addComments', this.comments.next_page_url)
      this.moreLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
