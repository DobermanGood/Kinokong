<template lang="html">
    <div v-if="comment && !isChildButLookAsParent">
      <div :id="'comment-id-' + comment.id" class="card comment" :class="{child: isChild, 'first-level': depth == 1, 'last-level': depth > 9}">
        <div class="depth" :style="{left: depthMargin}">
          <span v-for="level in depthCountForChild" :key="level" class="level"></span>
          <span v-if="depth > 4" class="blue-text level-count-show">{{depth}}</span>
        </div>
        <div class="comment-content">
          <div class="card-content">
            <custom-head v-if="showCustomHead" :comment="comment"></custom-head>
            <div class="head">
              <nuxt-link :to="{name: 'profile', query: {id: comment.user.id}}" class="author black-text">
                <img class="circle responsive-img avatar" :src="comment.user.avatar" :alt="comment.user.name" :title="comment.user.name">
                <span class="truncate">
                  {{ comment.user.name | shortText(30) }}
                </span>
              </nuxt-link>
              <span class="date">
                {{ comment.created_at }}
              </span>
            </div>
            <p class="flow-text content" v-text="shortContent.content"></p>
            <span v-if="shortContent.shorted" @click="contentShorted = false" class="pointer blue-text"> Показать всё</span>
          </div>
          <div v-if="!hideActions" class="card-action">
            <a @click="like()" :class="{'green-text': comment.isLiked}" :title="comment.isLiked ? 'Вы оценили комментарии' : 'Оценить комментарии'" class="waves-effect pointer like">
              <i class="fa fa-thumbs-up"></i>&nbsp; {{comment.likes}}
            </a>
            <a @click="dislike()" :class="{'red-text': comment.isdisLiked}" :title="comment.isdisLiked ? 'Вы оценили комментарии' : 'Оценить комментарии'" class="waves-effect pointer dislike">
              <i class="fa fa-thumbs-down"></i>&nbsp; {{comment.dislikes}}
            </a>
            <a @click="replyClick()" class="pointer" title="Ответить на данный комментарии">Ответить</a>
            <div v-if="comment.childsCount" class="childs">
              <a @click="loadChilds()" v-show="!opened" class="pointer">{{ comment.childsCount > 1 ? `Показать ответы (${comment.childsCount})` : 'Показать ответ' }}</a>
              <a @click="opened=false" v-show="opened" class="pointer">{{ comment.childsCount > 1 ? 'Скрыть ответы' : 'Скрыть ответ' }}</a>
            </div>
          </div>
          <comment-form v-if="reply" :formTo="formTo"></comment-form>
          <comment v-show="opened && childrens"
          v-for="commentValue in childrens"
          :key="commentValue.id"
          :comment="commentValue"
          :depth="depth+1"></comment>
          <div v-if="opened && childLoading" class="card-panel grey lighten-1 flow-text">
            Загрузка...
          </div>
          <div v-if="comment.next_page_url" class="center">
            <button @click.stop="loadMoreChilds()" :class="{disabled: moreChildsLoading}" class="btn">Загрузить еще</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import filters from '~/mixins/filters.js'
import CommentForm from './CommentForm.vue'
import CustomHead from './CustomHead.vue'

export default {
  name: 'Comment',
  props: {
    comment: Object,
    depth: Number,
    hideActions: {
      type: Boolean,
      default: false
    },
    showCustomHead: {
      type: Boolean,
      default: false
    }
  },
  mixins: [filters],
  components: { CommentForm, CustomHead },
  data() {
    return {
      reply: false,
      opened: false,
      contentShorted: true,
      childLoaded: false,
      childLoading: false,
      moreChildsLoading: false,
      formTo: {}
    }
  },
  computed: {
    childrens() {
      let childs = this.$store.state.comments.comments.data.filter(parentComment => {
        return parentComment.parent_id == this.comment.id
      })

      return childs
    },
    isChildButLookAsParent() {
      if(this.comment.films || this.comment.news)
        return false

      return this.comment.parent_id && !this.depth
    },
    isChild() {
      if(this.comment.films || this.comment.news)
        return false

      return this.comment.parent_id ? true : false
    },
    depthCountForChild() {
      if(innerWidth <= 605)
        return this.depth > 4 ? 5 : this.depth
      return this.depth > 9 ? 10 : this.depth
    },
    depthMargin() {
      return this.depthCountForChild == 1 ? '0px' : `-${this.depthCountForChild*12}px`
    },
    shortContent() {
      if(this.contentShorted) {
        let contentLength = this.comment.content.length
        let shorted = false
        let content = this.comment.content.substr(0, 300)
        if(contentLength > 300) {
          content+= ' ...'
          shorted = true
        }
        return {content, shorted}
      }
      return {content: this.comment.content, shorted: false}
    }
  },
  methods: {
    async loadMoreChilds() {
      this.$nextTick(() => {
        this.moreChildsLoading = true
      })
      await this.$store.dispatch('loadCommentChilds', this.comment.next_page_url)

      let newComment = this.comment
      newComment.next_page_url = null

      await this.$store.dispatch('setComment', {oldComment: this.comment, newComment})
      this.moreChildsLoading = false
    },
    loadChilds() {
      if(!this.childLoaded) {
        this.$nextTick(() => {
          this.childLoading = true
        })
        this.$store.dispatch('setCommentChilds', this.comment.id)
          .then(res => {
            this.childLoading = false
            this.childLoaded = true
          })
      }
      this.opened = true
    },
    async replyClick() {
      this.formTo = {name: 'comment', id: this.comment.id}
      this.reply=!this.reply
      this.opened = true
    },
    like() {
      if(!this.$auth.$state.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      this.$store.dispatch('likeComment', this.comment.id)
              .then(res => {
                if(res.ok === true) {
                  if(res.is) {
                    this.comment.isdisLiked = res.is.isdisLiked
                    this.comment.likes = res.is.likes
                    this.comment.dislikes = res.is.dislikes
                    this.comment.isLiked = res.is.isLiked
                  }

                  if(res.message)
                    this.$toast.show(res.message)
                  else
                    this.$toast.show('Вы оценили комментарии')
                }

                else
                  this.$toast.show(res.message)
              })
    },
    dislike() {
      if(!this.$auth.$state.loggedIn)
        return this.$toast.show('Вы не зарегистрированы')

      this.$store.dispatch('dislikeComment', this.comment.id)
              .then(res => {
                if(res.ok === true) {
                  if(res.is) {
                    this.comment.isdisLiked = res.is.isdisLiked
                    this.comment.likes = res.is.likes
                    this.comment.dislikes = res.is.dislikes
                    this.comment.isLiked = res.is.isLiked
                  }

                  if(res.message)
                    this.$toast.show(res.message)
                  else
                    this.$toast.show('Вы оценили комментарии')
                }

                else
                  this.$toast.show(res.message)
              })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/vars';

  .comment {
    .head {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      .date {
        margin-top: 1rem;
      }
      .author {
        display: flex;
        align-items: center;
        // margin-bottom: 1rem;
        .avatar {
          max-width: $avatarWidth;
          max-height: $avatarHeight;
          margin-right: 1rem;
        }
      }
    }
    .content {
      font-size: 1.2rem;
      word-break: break-word;
    }
    .dislike {
      i {
        transform: rotateY(180deg);
      }
    }
    .childs {
      display: inline-block;
    }
    // .level-count-show {
    //   display: none;
    // }
  }

  .child {
    display: flex;
    box-shadow: none;
    margin-left: 20px;
    .comment-content {
      width: 100%;
    }
    .depth {
      display: flex;
      padding-top: 24px;
      position: absolute;
      align-items: center;
      .level {
        margin-left: 5px;
        width: 6px;
        height: 6px;
        background: #2196F3 !important;
        border-radius: 50%;
      }
      .first-level {
        margin-left: 25px;
      }
      .last-level {
        margin-left: 0;
      }
      .level-count-show {
        margin-left: 10px;
      }
    }
    .last-level {
      margin-left: 0;
    }
  }

  .comment-form {
    padding: 0 2rem;
  }

  @media screen and (max-width: 768px) {
    .child {
      margin-left: 10px;
      .depth {
        flex-direction: column;
        left: -10px !important;
        .level {
          margin-left: 0;
          margin-bottom: 5px;
        }
        .level-count-show {
          margin-left: 0;
        }
      }
    }
  }
  @media screen and (max-width: 605px) {
    .child {
      margin-left: 5px;
    }
  }
</style>
