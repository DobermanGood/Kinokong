import axios from 'axios'
import Vue from 'vue'
import {urls, clientId, clientSecret} from './api'

// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage
//   localStorage = new LocalStorage('./scratch')
// }
//
// console.log(localStorage.getItem('token'))

export default {
  setToken: function(token, expiration) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', Date.now() + parseInt(expiration))
  },

  getToken: function() {
    let token = 'Bearer ' + localStorage.getItem('token')
    let expiration = localStorage.getItem('expiration')

    if(!token || !expiration)
      return null

    if(Date.now() > parseInt(expiration))
        return null

    return token
  },

  destroyToken: function() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  },

  isAuthenticated: function() {
    return this.getToken() ? true : false
  },

  getHeader: function() {
    const headers = {
        'Accept': 'application/json',
        'Authorization': this.getToken()
    }
    return headers
  },

  login: async function(email, password, redirect ) {
    await axios.post(urls.token, {
      'grant_type': 'password',
      'client_id': clientId,
      'client_secret': clientSecret,
      'username': email,
      'password': password,
      'scope': '',
    })
      .then(async res => {
        await this.setToken(res.data.access_token, res.data.expires_in)
        await this.setUser()
        await $nuxt.$toast.show('Вы вошли!')
        redirect ? $nuxt.$router.push( redirect ) : $nuxt.$router.push({name: 'profile'})
      })
      .catch(error => {
        if(error)
          $nuxt.$toast.show('Не правильный Email или Пароль, попробуйте еще раз')
        else
          $nuxt.$toast.show('Неизвестная ошибка!')
        console.log(error)
      })
  },

  setUser: async function() {
    if(!this.isAuthenticated) {
      $nuxt.$toast.show('Вы не авторизированы')
      $nuxt.$router.push('/')
    }
    await axios.get(urls.getUser, {headers: this.getHeader()})
      .then(res => {
        $nuxt.$store.dispatch('setUser', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
