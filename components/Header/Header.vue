<template>
  <header>
    <div class="navbar-fixed">
      <nav class="teal">
        <div class="nav-wrapper">
          <div class="container">
            <div>
              <a href="#mobile-slide-out" data-target="mobile-slide-out" class="left show-on-med-and-down sidenav-trigger">
                <i class="fa fa-bars"></i>
              </a>
              <nuxt-link to="/" class="brand-logo">Kinokong</nuxt-link>
              <nuxt-link v-if="!$auth.loggedIn" :to="{name: 'auth-login'}" class="right show-on-med-and-down sidenav-trigger hoverable-link">
                <i class="fa fa-sign-in"></i>
              </nuxt-link>
              <desktop-header @logout="logout()" />
              <a class="right modal-trigger hoverable-link" href="#search-modal">
                <i class="fa fa-search"></i>
              </a>
              <search-modal id="search-modal" />
            </div>
          </div>
        </div>
      </nav>
    </div>
    <mobile-header @logout="logout()" />
  </header>
</template>

<script>
import desktopHeader from './desktopHeader.vue'
import mobileHeader from './mobileHeader.vue'
import searchModal from '../search/SearchModal.vue'

export default {
  components: { desktopHeader, mobileHeader, searchModal },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.show('Вы вышли')
    }
  },
  mounted() {
    $('.sidenav').sidenav()
  }
}
</script>

<style lang="scss">
  .hoverable-link {
    padding: 0 15px;
    transition: background-color .3s;
    &:hover {
      background-color: #00897b;
    }
  }
</style>
