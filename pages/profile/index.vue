<template lang="html">
  <div class="row">
    <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
          <a :href="profile.avatar">
            <img :src="profile.avatar">
          </a>
        </div>
        <div class="card-content">
          <li>ID: {{ profile.id }}</li>
          <li>Имя: {{ profile.name }}</li>
          <li>E-mail: {{ profile.email }}</li>
          <li>Группа: {{ profile.role.display_name }}</li>
          <li>Дата регистрации: {{ profile.created_at }}</li>
        </div>
        <div v-if="isMyProfile" class="card-action center">
          <nuxt-link :to="{name: 'profile-edit'}">Редактировать</nuxt-link>
        </div>
      </div>
    </div>
    <div class="col s12 m8">
      <ul class="tabs">
        <li class="tab col s6"><a class="active" href="#my-comments">{{isMyProfile ? 'Мои комментарии' : 'Комментарии'}}</a></li>
        <li class="tab col s6"><a href="#test2">Test 2</a></li>
      </ul>
      <div id="my-comments" class="col s12">
        <!-- key нужен чтобы блок обновлялся только если профиль был изменен -->
        <user-comments :profileId="profile.id" :key="profile.id"></user-comments>
      </div>
      <div id="test2" class="col s12 hide">Test 2</div>
    </div>
  </div>
</template>

<script>
import userComments from '~/components/profile/userComments.vue'

export default {
  middleware: 'auth',
  components: {userComments},
  mounted() {
    $('.tabs').tabs()
  },
  watchQuery: true,
  async asyncData(context) {
    try {
      let profile = null

      if(context.route.query.id) {
        let res = await context.app.$axios.get(context.app.$api.urls.getUser, {
          params: {
            id: context.route.query.id
          }
        })

        profile = await res.data
      }

      else {
        await context.app.$auth.fetchUser()
        profile = await context.app.$auth.user
      }

      if(!profile.id)
        await context.error({statusCode: 404, message: 'Пользователь не найден'})


      return {
        profile
      }
    }

    catch (e) {
      context.error({statusCode: 404, message: 'Пользователь не найден'})
    }
  },
  computed: {
    isMyProfile() {
      return this.profile.id === this.$auth.user.id
    }
  }
}
</script>

<style lang="scss" scoped>
  #my-comments {
    padding: 0;
  }
</style>
