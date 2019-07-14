<template lang="html">
  <div class="left-side">
    <div class="image">
      <div v-if="film.qualities" class="red z-depth-2 quality">
        {{ film.qualities.name }}
      </div>
      <img :src="film.image_link.original" :alt="film.title" :title="film.title">
    </div>

    <v-film-like-buttons :film="film"/>

    <ul class="collection film-info">
      <li class="collection-item">
        Страна: <span class="right-side">{{film.country}}</span>
      </li>
      <li class="collection-item">
        Время: <span class="right-side">{{film.time_length}}</span>
      </li>
      <li class="collection-item">
        Год:
        <nuxt-link to="/" class="hover-underline">
          <span class="right-side">{{film.public_year}}</span>
        </nuxt-link>
      </li>
      <li class="collection-item">
        Звук: <span v-if="film.sound_qualities" class="right-side">{{film.sound_qualities.name}}</span>
      </li>
      <li class="collection-item">
        Жанр:
        <span v-if="film.categories"
              v-for="(category, index) in film.categories"
              :key="category.id"
              class="right-side">
          <nuxt-link :to="{name: 'category-id', params: {id: category.id}}" class="hover-underline">
            {{category.name}} {{ film.categories.length - 1 == index ? '' : ',' }}
          </nuxt-link>
        </span>
      </li>
    </ul>
    <div v-if="film.tags.length" class="tags card-panel">
      <span>Теги:</span>
      <nuxt-link v-for="(tag, index) in film.tags"
                 :key="tag.id"
                 class="hover-underline"
                 to="/">
        {{tag.name}} {{ film.tags.length - 1 == index ? '' : ',' }}
      </nuxt-link>
    </div>
    <div v-if="actors.length" class="actors card-panel">
      <span>В ролях:</span>
      <nuxt-link v-for="(actor, index) in actors"
                 :key="actor.id"
                 class="hover-underline"
                 to="/">
        {{actor.name}} {{ actors.length - 1 == index ? '' : ',' }}
      </nuxt-link>
    </div>
    <div v-if="directors.length" class="actors card-panel">
      <span>{{directors.length > 1 ? 'Режиссеры' : 'Режиссер'}}:</span>
      <nuxt-link v-for="(director, index) in directors"
                 :key="director.id"
                 class="hover-underline"
                 to="/">
        {{director.name}} {{ directors.length - 1 == index ? '' : ',' }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import vFilmLikeButtons from '../FilmLikeButtons.vue'

export default {
  props: ['film'],
  components: {vFilmLikeButtons},
  computed: {
    actors() {
      if(this.film.actors)
        return this.film.actors.filter(actor => {
          return actor.type == 'actor'
        })
    },
    directors() {
      if(this.film.actors)
        return this.film.actors.filter(actor => {
          return actor.type == 'director'
        })
    }
  }
}
</script>

<style lang="scss" cropeed>
  .left-side {
    .image {
      position: relative;
      .quality {
        color: #fff;
        font-weight: 500;
        position: absolute;
        padding: 10px;
        z-index: 3;
      }
      img {
        max-width: 100%;
      }
    }
    .film-info li .right-side {
      font-weight: 500;
    }
    .actors span {
      margin-right-side: 5px;
    }
  }
</style>
