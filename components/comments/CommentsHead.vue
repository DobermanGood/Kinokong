<template lang="html">
  <div class="comments-head">
    <h5 class="title">
      Добавить Комментарий
    </h5>
    <button class='dropdown-trigger comments-dropdown-trigger btn' data-target='comments-dropdown'>
      <i class="fa fa-sort"></i> &nbsp; Упорядочить
    </button>
    <ul id='comments-dropdown' class='dropdown-content'>
      <li :class="{active: type == 'oldest'}"><a @click="orderComments('oldest')">Сначала старые</a></li>
      <li :class="{active: type == 'latest'}"><a @click="orderComments('latest')">Сначала новые</a></li>
      <li :class="{active: type == 'popular'}"><a @click="orderComments('popular')">Сначала популярные</a></li>
      <li :class="{active: type == 'discuss'}"><a @click="orderComments('discuss')">Сначала обсуждаемые</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'oldest'
    }
  },
  mounted() {
    $('.comments-dropdown-trigger').dropdown({
      constrainWidth: false,
      coverTrigger: false
    })
  },
  methods: {
    orderComments(type) {
      if(this.$store.state.films.currentFilm) {
        this.type = type
        let url = this.$api.urls.getFilmComments +
                  this.$store.state.films.currentFilm.id +
                  '/order_by/' + type

        this.$store.dispatch('setComments', url)
      }
    }
  }
}
</script>

<style lang="scss">
  .comments-head {
    .title {
      display: inline-block;
      margin-right: 2rem;
    }
  }
</style>
