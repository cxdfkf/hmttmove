<template>
  <div>

    <!-- 用户信息 -->
    <van-cell-group
      class="user-info"
      v-if="$store.state.user"
    >
      <van-cell
        class="base-info"
        is-link
        :border="false"
        @click="$router.push('/user')"
      >
        <div slot="title">
          <img
            class="avatar"
            :src="user.photo"
            alt=""
          >
          <span class="title">{{ user.name }}</span>
        </div>
      </van-cell>
      <van-grid
        class="data-info"
        :border="false"
      >
        <van-grid-item>
          <span class="count">{{ user.art_count }}</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.follow_count }}</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.fans_count }}</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.like_count }}</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- /用户信息 -->
    <!-- 未登录 -->
    <div
      class="not-login"
      v-else
    >
      <div
        class="circle"
        @click="$router.push({ name: 'login' })"
      >
        <span>登录</span>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 其它 -->
    <van-cell-group>
      <van-grid clickable>
        <van-grid-item
          icon="star"
          text="我的收藏"
        />
        <van-grid-item
          icon="chat"
          text="我的评论"
        />
        <van-grid-item
          icon="like"
          text="我的点赞"
        />
        <van-grid-item
          icon="browsing-history"
          text="浏览历史"
        />
      </van-grid>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        title="消息通知"
        is-link
      />
      <van-cell
        title="用户反馈"
        is-link
      />
      <van-cell
        title="小智同学"
        is-link
        @click="$router.push('/chat')"
      />
      <van-cell
        title="系统设置"
        is-link
        to="/settings"
      />
    </van-cell-group>
    <!-- /其它 -->
    <!-- 底部栏 -->
    <van-tabbar route>
      <van-tabbar-item
        icon="home-o"
        to="/"
      >首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item
        icon="setting-o"
        to="/my"
      >{{$store.state.user?"我的":"未登录"}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async  getuserInfo () {
      let { data } = await getUserInfo()
      this.user = data.data
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}

.user-info {
  .base-info {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 15px;
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
}
</style>
