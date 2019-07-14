<template lang="html">
  <div class="custom-comment-head">
    <nuxt-link :to="{name: typeOfComment.name, params: {id: typeOfComment.data.id}}" class="truncate">
        {{ typeOfComment.data.title }} ({{ typeOfComment.data.public_year }})
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  computed: {
    typeOfComment() {
      if(this.comment.films)
        return {
          name: 'films-id',
          data: this.comment.films[0]
        }
      else if(this.comment.news)
        return {
          name: 'news-id',
          data: this.comment.news[0]
        }

      return {}
    }
  }
}
</script>

<style lang="scss">
  .custom-comment-head {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
