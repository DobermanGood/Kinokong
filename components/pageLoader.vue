<template lang="html">
  <div v-show="loading" class="page-loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
</style>
