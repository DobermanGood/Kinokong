<template lang="html">
  <div class="container">
    <div v-show="invalid" class="card-panel red">
      Не все поля заполнены правильно
    </div>
    <form @submit.prevent="login()">
      <div class="input-field">
        <input v-model="email" id="email" type="email" class="validate" required>
        <label for="email">Email</label>
        <span class="helper-text" data-error="Не верный Email"></span>
      </div>
      <div class="input-field">
        <input v-model="password" id="password" type="password" class="validate" required>
        <label for="password">Пароль</label>
        <span class="helper-text" data-error="Не меньше 6 символов и больше 30">Не меньше 6 символов</span>
      </div>
      <div class="input-field">
        <button type="submit" class="waves-effect waves-light btn">Войти</button>
        &nbsp;&nbsp;&nbsp;
        <nuxt-link :to="{name: 'auth-register'}" class="btn grey">Регистрация</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import {clientId, clientSecret} from '../../common/api.js'

export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      invalid: false
    }
  },
  methods: {
    async login() {
      if(this.valid) {
        this.invalid = false
        await this.$toast.show('Захожу...')
        await this.$auth.loginWith("laravel", {
          data: {
            'grant_type': 'password',
            'client_id': clientId,
            'client_secret': clientSecret,
            'username': this.email,
            'password': this.password,
            'scope': '',
          }
        })
        .then(() => {
          this.$toast.show('Вы вошли!')
        })
        .catch(err => {
          console.log(err)
          if(err == 'Error: Request failed with status code 401')
            this.$toast.show('Не правильный логин или пароль')
          else
            this.$toast.show('Неизвестная ошибка')
        })
      }
      else
        this.invalid = true
    }
  },
  computed: {
    passwordValid() {
      return (this.password.length < 6 || this.password.length > 30) ? false : true
    },
    valid() {
      return (!this.email.length || !this.passwordValid) ? false : true
    }
  }
}
</script>

<style lang="scss">
</style>
