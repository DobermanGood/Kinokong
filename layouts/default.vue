<template>
  <div>
    <v-header></v-header>
    <div class="container">
      <div class="row">
        <nuxt/>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import vHeader from '~/components/Header/Header.vue'
  import vFooter from '~/components/Footer/Footer.vue'

  export default {
    components: {
      vHeader, vFooter
    }
  }
</script>

<style>

</style>
