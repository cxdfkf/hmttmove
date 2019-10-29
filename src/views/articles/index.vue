<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading
      class="article-loading"
      v-if="loading"
    />
    <!-- 当加载中时，显示 -->
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div
      class="detail"
      v-else-if="article.title"
    >
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image
          round
          width="2rem"
          height="2rem"
          fit="fill"
          :src="article.aut_photo"
        />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|relativeTime}}</p>
        </div>
        <!-- 关注按钮 -->
        <van-button
          round
          size="small"
          type="info"
          @click="isfocusUser"
        >{{article.is_followed ? "取消关注" : "+关注"}}</van-button>
      </div>
      <div
        class="content"
        v-html="article.content"
      ></div>
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          :type="article.attitude===1?'default':'primary'"
          plain
          :icon="article.attitude===1?'good-job':'good-job-o'"
          @click="dianzan"
        >{{article.attitude===1 ? "取消点赞" : "点赞"}}</van-button>
        <!-- icon="good-job-o" -->
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          @click="onlike"
        >{{article.attitude===0?"取消不喜欢":"不喜欢"}}</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div
      class="error"
      v-else
    >
      <p>网络超时，点击 <a
          href="#"
          @click.prevent="getArticlesDetail"
        >刷新</a> 试一试。</p>
    </div>
    <!-- /加载失败的消息提示 -->
    <article-comment :articleId="$route.params.articleId" />
  </div>
</template>

<script >
import { getArticlesDetail, dianzan, cancleDianzan, dislikeArticle, likeArticle } from '@/api/article'
import { focusUser, cancleUser } from '@/api/user'
import ArticleComment from '@/components/article-comment'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {},
      loading: false
    }
  },
  components: {
    'article-comment': ArticleComment
  },
  methods: {
    // 对文章喜欢的处理
    async  onlike () {
      const articleId = this.$route.params.articleId
      if (this.article.attitude === 0) {
        await likeArticle(articleId)
        this.article.attitude = -1
      } else {
        await dislikeArticle(articleId)
        this.article.attitude = 0
      }
    },
    // 对点赞的处理
    async  dianzan () {
      const articleId = this.$route.params.articleId
      if (this.article.attitude === 1) {
        await cancleDianzan(articleId)
        this.article.attitude = -1
      } else {
        await dianzan(articleId)
        this.article.attitude = 1
      }
    },
    // 对应关注的处理
    async  isfocusUser () {
      // 将其结果发送给接口
      if (this.article.is_followed) {
        await cancleUser(this.article.aut_id)
      } else {
        await focusUser(this.article.aut_id)
      }
      // 值的变化
      this.article.is_followed = !this.article.is_followed
    },
    // 获取文章详情
    async  getArticlesDetail () {
      this.loading = true
      try {
        let { data } = await getArticlesDetail(this.$route.params.articleId)
        // console.log(data)

        this.article = data.data
      } catch (error) {
        console.log(error)
      }
      // 无论加载成功或失败，loading都要结束
      this.loading = false
    }
  },
  created () {
    this.getArticlesDetail()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-icon-arrow-left {
  color: #fff;
}
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
