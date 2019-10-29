<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        /> <span
          style="color: #466b9d;"
          slot="title"
        >{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p> <span style="margin-right: 10px;">{{item.pubdate|relativeTime}}</span>
            <van-button
              size="mini"
              type="default"
              @click="onReplyshow(item)"
            >回复{{ item.reply_count }}</van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          @click="commentLiking(item)"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        v-model="contentText"
        clearable
        placeholder="请输入评论内容"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="onaddComment"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
    >
      <comment-reply
        :comment="currentComment"
        v-if="isReplyShow"
      />
    </van-popup>
    <!-- /评论回复 -->
  </div>

</template>

<script>
import { getComment, addComment, addCommentLike, deleteCommentLike } from '@/api/comment'
import CommentReply from '@/components/comment-reply'
export default {
  name: 'ArticleComment',
  props: ['articleId'], // 父给子组件传值
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      contentText: '',
      isReplyShow: false,
      currentComment: ''
    }
  },
  components: {
    'comment-reply': CommentReply
  },
  methods: {
    // 点击弹层显示
    onReplyshow (comment) {
      this.currentComment = comment
      this.isReplyShow = true
    },
    // 对评论点赞与否
    async commentLiking (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        await deleteCommentLike(commentId)
      } else {
        // 否则，点赞
        await addCommentLike(commentId)
      }
      comment.is_liking = !comment.is_liking
    },
    // 1

    // 发布评论
    async  onaddComment () {
      const content = this.contentText.trim()
      if (!content) {
        return
      }
      let { data } = await addComment({ target: this.articleId, content: content })
      // console.log(data)
      // 将本次添加的放到最上面
      this.list.unshift(data.data.new_obj)
      // 将其内容清空
      this.contentText = ''
    },
    async  onLoad () {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      // console.log(this.articleId)

      // 获取文章评论结果
      let { data } = await getComment({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      // 将结果给list
      this.list.push(...data.data.results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.data.last_id) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
      // }, 500)
    }
    // 2
  }
}

</script>

<style lang="less" scoped>
.article-comments {
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .van-list {
    margin-bottom: 45px;
  }
}
</style>
