<template lang="html">
  <footer class="page-footer blue-grey darken-3">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Смотреть лучшие фильмы онлайн можно на сайте КиноКонг</h5>
        </div>
        <div class="col l4 offset-l2 s12">
          <ul>
            <li><nuxt-link class="grey-text text-lighten-3" to="/">Главная</nuxt-link></li>
            <li><nuxt-link class="grey-text text-lighten-3" to="/po">Правообладателям</nuxt-link></li>
            <li><nuxt-link class="grey-text text-lighten-3" to="/contacts">Контакты</nuxt-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      © {{currentYear}} Copyright Kinokong
      <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
</style>
