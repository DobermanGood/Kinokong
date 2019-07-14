<template lang="html">
  <div>
    <div v-if="comments">
      <comment v-if="comments.data"
               v-for="commentValue in comments.data"
               :key="commentValue.id"
               :comment="commentValue"
               :depth="0"
               :hideActions="true"
               :showCustomHead="true"/>
       <div v-if="!comments.data.length" class="center">
         <h5>Комментариев нет</h5>
       </div>
       <div v-if="comments.next_page_url" class="center">
         <button @click.stop="loadMore()" :class="{disabled: moreLoading}" class="btn">Загрузить еще</button>
       </div>
    </div>
    <div class="center p100" v-if="!comments || moreLoading">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Comment from '../comments/Comment.vue'
import Loader from '../Loader.vue'

export default {
  middleware: 'auth',
  components: {Comment, Loader},
  props: ['profileId'],
  data() {
    return {
      moreLoading: false
    }
  },
  mounted() {
    let url = this.$api.urls.getUserComments + this.profileId
    this.$store.dispatch('setComments', url)
  },
  computed: {
    comments() {
      return this.$store.getters.userComments
    }
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
