<template>
  <div>
    <van-nav-bar fixed>
      <van-button
        round
        type="info"
        slot="title"
        class="btn"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 子路由出口 -->
    <router-view />
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
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.btn {
  width: 100%;
  background: #5babfb;
}
</style>
