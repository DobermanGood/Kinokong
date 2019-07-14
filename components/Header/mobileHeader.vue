<template lang="html">
  <ul id="mobile-slide-out" class="sidenav">
    <li v-if="$auth.loggedIn">
      <div class="user-view">
        <div class="background">
          <img src="~/static/darkBackground.jpg" alt="background">
        </div>
        <nuxt-link :to="{name: 'profile'}" class="sidenav-close"><img class="circle" :src="$auth.user.avatar" :alt="'Аватар ' + $auth.user.name"></nuxt-link>
        <nuxt-link :to="{name: 'profile'}" class="sidenav-close"><span class="white-text name">{{$auth.user.name}}</span></nuxt-link>
        <nuxt-link :to="{name: 'profile'}" class="sidenav-close"><span class="white-text email">{{$auth.user.email}}</span></nuxt-link>
      </div>
    </li>
    <li>
      <nuxt-link to="/" class="sidenav-close">
        <i class="fa fa-home"></i>Главная страница
      </nuxt-link>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <nuxt-link :to="{name: 'top-type', params: {type: 'views'}}" class="sidenav-close">
        <i class="fa fa-arrow-up"></i>Топ по просмотрам
      </nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'top-type', params: {type: 'likes'}}" class="sidenav-close">
        <i class="fa fa-arrow-up"></i>Топ по рейтингу
      </nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'top-type', params: {type: 'comments'}}" class="sidenav-close">
        <i class="fa fa-arrow-up"></i>Топ по комментариям
      </nuxt-link>
    </li>
    <!-- For Guests -->
    <div v-if="!$auth.loggedIn">
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <nuxt-link :to="{name: 'auth-login'}" class="sidenav-close">
          <i class="fa fa-sign-in"></i>Войти
        </nuxt-link>
      </li>
    </div>
    <!-- For Auth -->
    <div v-else>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <nuxt-link :to="{name: 'profile'}" class="sidenav-close">
          <i class="fa fa-user"></i>Профиль
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'profile-favourite'}" class="sidenav-close">
          <i class="fa fa-heart"></i>Закладки
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'profile-bookmark'}" class="sidenav-close">
          <i class="fa fa-eye"></i>Посмотреть позже
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'profile-liked'}" class="sidenav-close">
          <i class="fa fa-thumbs-up"></i>Понравившиеся
        </nuxt-link>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <nuxt-link :to="{name: 'profile-viewed'}" class="sidenav-close">
          <i class="fa fa-history"></i>История
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'playlists-user-id', params: {id: $auth.user.id}}" class="sidenav-close">
          <i class="fa fa-th-list"></i>Плейлисты
        </nuxt-link>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a @click="$emit('logout')" class="pointer sidenav-close">
          <i class="fa fa-sign-out"></i>Выйти
        </a>
      </li>
    </div>
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
