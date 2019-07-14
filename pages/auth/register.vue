<template lang="html">
  <div class="container">
    <div v-show="invalid" class="card-panel red">
      Не все поля заполнены правильно
    </div>
    <form @submit.prevent="register()">
      <div class="input-field">
        <input v-model="username" @change="usernameChanged()" id="username" type="text" class="validate" :class="{invalid: !checkUsername, valid: checkUsername}" required>
        <label for="username">Имя пользователя (Никнейм)</label>
        <span class="helper-text" data-error="Пользоваель с таким Никнеймом уже существует"></span>
      </div>
      <div class="input-field">
        <input v-model="email" @change="emailChanged()" id="email" type="email" class="validate" :class="{invalid: !checkEmail, valid: checkEmail}" required>
        <label for="email">Email</label>
        <span class="helper-text" data-error="Не корректно введен Email или пользоваель с таким Email уже существует"></span>
      </div>
      <div class="input-field">
        <input v-model="password" id="password" type="password" class="validate" required>
        <label for="password">Пароль</label>
        <span class="helper-text" data-error="Не меньше 6 символов и не больше 30">Не меньше 6 символов</span>
      </div>
      <div class="input-field">
        <input v-model="password_confirmation" id="password_confirmation" type="password" class="validate" required>
        <label for="password">Повторите Пароль</label>
        <span class="helper-text" data-error="Не меньше 6 символов и не больше 30">Не меньше 6 символов</span>
      </div>
      <div class="input-field">
        <button type="submit" class="btn">Регистрация</button>
        &nbsp;&nbsp;&nbsp;
        <nuxt-link :to="{name: 'auth-login'}" class="btn grey">Войти</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import {clientId, clientSecret, urls} from '../../common/api.js'

export default {
  middleware: 'guest',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      checkEmail: true,
      checkUsername: true,
      invalid: false
    }
  },
  methods: {
    register() {
      if(this.valid) {
        this.invalid = false
        this.$toast.show('Регистрирую...')
        this.$axios.post(urls.register, {
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(res => {
          this.$toast.show('Аккаунт создан!')
          this.$auth.loginWith("laravel", {
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
            this.$toast.show('Неизвестная ошибка')
          })
        })
        .catch(err => {
            this.$toast.show('Неизвестная ошибка')
        })
      }
      else
        this.invalid = true
    },

    emailChanged() {
      this.$axios.post(urls.checkEmail, {email: this.email})
        .then(res => {
          this.checkEmail = res.data.status == 'ok' ? true : false
        })
        .catch(error => {
          this.checkEmail = false
        })
    },

    usernameChanged() {
      this.$axios.post(urls.checkUsername, {name: this.username})
        .then(res => {
          this.checkUsername = res.data.status == 'ok' ? true : false
        })
        .catch(error => {
          this.checkUsername = false
        })
    }
  },
  computed: {
    passwordValid() {
      return (this.password.length < 6 || this.password.length > 30) ? false : true
    },
    passwordConfirmValid() {
      return this.password === this.password_confirmation
    },
    valid() {
      return (!this.email.length || !this.passwordValid || !this.passwordConfirmValid) ? false : true
    }
  }
}
</script>

<style lang="scss">
</style>
