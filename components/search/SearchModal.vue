<template lang="html">
  <div :id="id" ref="modal" class="modal">
    <div class="modal-content">
      <search-modal-form @closeModal="closeModal()" />
      <ul v-if="1+1==2" class="collection result">
        <nuxt-link to="/" v-for="i in 10" :key="i" class="black-text collection-item avatar" tabindex>
          <img src="http://localhost:8000/storage/films/July2018/q71rARmwnqRra7oGi4q4-cropped.jpg" class="circle" alt="">
          <span class="title">Title (2010) lorem</span>
        </nuxt-link>
      </ul>
      <p v-else class="flow-text center black-text">
        Сейчас хозяйн...
      </p>
    </div>
  </div>
</template>

<script>
import SearchModalForm from './SearchModalForm.vue'

export default {
  props: ['id'],
  components: { SearchModalForm },
  mounted() {
    this.initModal()
  },
  methods: {
    initModal() {
      $(this.$refs.modal).modal({
        onOpenStart() {
          setTimeout(() => {
            $(`#${this.id} #search-box`).focus()
          }, 200)
        }
      })
    },
    closeModal() {
      $(this.$refs.modal).modal('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    display: flex;
    flex-wrap: wrap;
    .collection-item {
      flex-grow: 1;
      img.circle {
        border-radius: 3px;
        height: 65px !important;
      }
    }
  }
</style>
