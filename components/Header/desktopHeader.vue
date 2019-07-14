<template lang="html">
  <ul class="right hide-on-med-and-down">
    <li>
      <a href="#" class='dropdown-trigger' data-target='top-dropdown'>Топ</a>
    </li>

    <li v-if="!$auth.loggedIn">
      <nuxt-link :to="{name: 'auth-login'}">Войти</nuxt-link>
    </li>

    <a class='dropdown-trigger profile-head' data-target='profile-dropdown'>
      <span v-if="$auth.loggedIn" class="truncate lg-name">{{ $auth.user.name }}</span>
      <img v-if="$auth.loggedIn" class="circle" :src="$auth.user.avatar" :alt="'Аватар ' + $auth.user.name">
      <span v-if="$auth.loggedIn">&nbsp; <i class="fa fa-caret-down"></i></span>
    </a>

    <!-- Profile Dropdown Structure -->
    <ul id='profile-dropdown' class='dropdown-content'>
      <div v-if="$auth.loggedIn">
        <li>
          <nuxt-link :to="{name: 'profile'}">
            <i class="fa fa-user"></i>Профиль
          </nuxt-link>
        </li>
        <li class="divider"></li>
        <li>
          <nuxt-link :to="{name: 'profile-favourite'}">
            <i class="fa fa-heart"></i>Закладки
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'profile-bookmark'}">
            <i class="fa fa-eye"></i>Посмотреть позже
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'profile-liked'}">
            <i class="fa fa-thumbs-up"></i>Понравившиеся
          </nuxt-link>
        </li>
        <li class="divider"></li>
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
        <li class="divider"></li>
        <li>
          <a @click="$emit('logout')">
            <i class="fa fa-sign-out"></i>Выйти
          </a>
        </li>
      </div>
    </ul>

    <!-- Top Dropdown Structure -->
    <ul id='top-dropdown' class='dropdown-content'>
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
    </ul>
  </ul>
</template>

<script>
export default {
  mounted() {
    $('.dropdown-trigger').dropdown({
      constrainWidth: false,
      coverTrigger: false
    });
  }
}
</script>

<style lang="scss">
  .circle {
    height: 32px;
    width: 32px;
  }
  .profile-head {
    display: flex;
    justify-content: center;
    align-items: center;
    .lg-name {
      max-width: 100px;
      margin-right: 1rem;
    }
  }
  #profile-dropdown {
    li {
      a {
        i {
          margin: 0;
        }
      }
    }
  }
</style>
