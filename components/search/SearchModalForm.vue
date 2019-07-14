<template lang="html">
  <input v-model="searchText" @keydown.enter="goToSearchPage()" id="search-box" type="text" placeholder="Один дома...">
</template>

<script>
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    goToSearchPage() {
      this.$emit('closeModal')
      this.$router.push({name: 'search', query: {q: this.searchText}})
    }
  }
}
</script>

<style lang="css">
</style>
