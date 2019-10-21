<template>
  <div class="result">
    <van-nav-bar
      left-arrow
      fixed
      @click-left="$router.back()"
    >
      <span slot="title">{{$route.params.q+"的搜索结果"}}</span></van-nav-bar>
    <!-- @click-left="onClickLeft" -->
    <!-- @click-right="onClickRight" -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id.toString()"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getRes } from '@/api/search'
export default {
  name: 'ResultIndex',
  data () {
    return {
      results: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false
    }
  },
  methods: {
    // 当下拉到底部时。自动调用onload函数，并将loading改为true
    async  onLoad () {
      // 请求获取数据
      let { data } = await getRes({ q: this.$route.params.q, page: this.page, per_page: this.per_page })
      // 将结果添加到数组中
      this.results.push(...data.data.results)
      // 加载状态结束
      this.loading = false

      if (data.data.results.length) {
        this.page++
      } else {
        // 数据全部加载完成
        this.finished = true
      }
    }

  }
}
</script>

<style scoped lang="less">
.result {
  .van-icon-arrow-left {
    color: #fff;
  }
  .list {
    margin-top: 46px;
  }
}
</style>
