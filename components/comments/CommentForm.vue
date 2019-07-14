<template lang="html">
    <form @submit.prevent="send()" class="comment-form">
    	<div class="input-field">
    		<label for="comment-content">Текст комментария...</label>
    		<textarea v-model="content" class="materialize-textarea" :id="'form-' + formTo.name + formTo.id" data-length="20000"></textarea>
    		<!-- <span class="helper-text">Не больше 20000 символов</span> -->
    	</div>
    	<div class="input-field">
    		<button class="btn waves-effect waves-light" type="submit">Отправить</button>
    	</div>
    </form>
</template>

<script>
export default {
  props: ['formTo'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async send() {
      if(!this.$auth.$state.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      let url = this.$api.urls.comments +
                this.formTo.name + '/' + this.formTo.id

      let data = { content: this.content }

      await this.$store.dispatch('createComment', {url, data})
      this.content = ''
      $('.hiddendiv.common').html('<br>')
      $(`textarea#form-${this.formTo.name}${this.formTo.id}`).css({height: '3rem'})
    }
  },
  mounted() {
    $(`textarea#form-${this.formTo.name}${this.formTo.id}`).characterCounter()
  }
}
</script>

<style lang="scss" scoped>

</style>
