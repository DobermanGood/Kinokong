<template>
<div class="row">
  <form @submit.prevent="handleFormSubmit()">
    <div class="input-field col s12">
      <input v-model="newData.name" id="name" type="text" class="validate">
      <label for="name" class="active">Имя</label>
      <span class="helper-text">Не меньше 3 и небольше 30 символов</span>
    </div>
    <div class="input-field col s12">
      <input v-model="newData.email" id="email" type="email" class="validate">
      <label for="email" class="active">E-mail</label>
    </div>
    <div class="input-field col s12">
      <input v-model="newData.oldpass" id="new-password" type="password" class="validate">
      <label for="new-password">Старый пароль</label>
      <span class="helper-text">Не меньше 5 и небольше 30 символов</span>
    </div>
    <div class="input-field col s12">
      <input v-model="newData.newpass" id="old-password" type="password" class="validate">
      <label for="old-password">Новый пароль</label>
      <span class="helper-text">Не меньше 5 и небольше 30 символов</span>
    </div>
    <div class="file-field input-field col s12">
      <div class="btn">
        <span>Аватар</span>
        <input type="file" class="validate">
      </div>
      <div class="file-ath-wrapper">
        <input type="text" class="file-path validate">
      </div>
    </div>
    <div class="input-field col s12">
      <button type="submit" class="btn waves-effect waves-light">
        ИЗМЕНИТЬ
      </button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      newData: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        oldpass: '',
        newpass: ''
      }
    }
  },
  methods: {
    handleFormSubmit() {
      this.$axios.post(this.$api.urls.profileEdit, this.newData)
        .then(res => {
          this.$toast.show('Изменения применены!')
          this.$router.push({
            name: 'profile'
          })
        }).catch(error => {
          console.log(error)
          this.$toast.show(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
