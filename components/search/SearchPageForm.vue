<template lang="html">
  <div class="input-field search-box">
    <input v-model="searchText" @input="search()" type="text" placeholder="Один дома...">
    <loader v-if="isLoading" />
  </div>
</template>

<script>
import Loader from '../Loader.vue'

export default {
  components: { Loader },

  data() {
    return {
      searchText: ''
    }
  },

  created() {
    this.searchText = this.$store.state.search.q
  },

  watch: {
    '$store.state.search.q'() {
      this.searchText = this.$store.state.search.q
    }
  },

  methods: {
    search() {
      this.$store.dispatch('setDetailResult', this.searchText)
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.search.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .preloader-wrapper {
      width: 30px;
      height: 30px;
    }
  }
</style>
