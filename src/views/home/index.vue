<template>
  <div class="home">
    <!-- 弹层 -->
    <van-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
      closeable
    >
      <!-- 我的频道 -->
      <p class="my">
        <span style="margin-left:20px;font-size:18px">我的频道</span>
        <van-button
          type="danger"
          size="mini"
          style="float:right;right:20px"
          @click="isclose=!isclose"
        >{{isclose?"完成":"编辑"}}</van-button>
      </p>
      <!-- 宫格组件 -->
      <van-grid>
        <van-grid-item
          :text="channels[0].name"
          @click="tuijiandel(0)"
        ></van-grid-item>
        <van-grid-item
          :text="channel.name"
          v-for="(channel,index) in channels.slice(1)"
          :key="channel.id"
          @click="qhanddel(index)"
        >
          <div
            slot="icon"
            class="righticon"
            v-show="isclose"
          >
            <van-icon name="close" />
          </div>
        </van-grid-item>

      </van-grid>
      <p class="my">
        <span style="margin-left:20px;font-size:18px">推荐频道</span>
      </p>
      <van-grid>
        <!-- 推荐频道 -->
        <van-grid-item
          :text="channel.name"
          v-for="channel in resChannels"
          :key="channel.id"
          @click="addchannel(channel)"
        >
        </van-grid-item>
      </van-grid>
    </van-popup>
    <van-tabs
      v-model="active"
      animated
      swipeable
    >
      <!-- 右侧的面包按钮 -->
      <div
        slot="nav-right"
        class="wap-nav"
        @click="isShow=!isShow"
      >
        <van-icon
          name="wap-nav"
          class="wap-nav"
          size="24"
        />
      </div>

      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >

        <van-pull-refresh
          v-model="channel.isLoading"
          @refresh="onRefresh"
        >
          <!-- 下拉加载更多 -->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- item.art_id的类型是大数字类型，key的值只能是数字和字符串，因此要转化  item.art_id.toString() -->
            <van-cell
              v-for="item in channel.article"
              :key="item.art_id.toString()"
              :title="item.title"
              @click="$router.push('/article/'+item.art_id)"
            >
              <!-- 字符串外双里单 -->
              <!-- @click="$router.push({name:'article',params:{articleId:item.art_id.toString()}})" -->
              <div slot="label">
                <van-grid
                  :border="false"
                  :column-num="3"
                >
                  <van-grid-item
                    v-for="(img, index) in item.cover.images"
                    :key="index"
                  >

                    <van-image
                      height="80"
                      :src="img"
                      lazy-load
                    />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">

                    <span>{{ item.aut_name }}</span>
                    <span>{{ item.comm_count }}评论</span>
                    <span>{{ item.pubdate |relativeTime}}</span>
                  </div>

                  <van-icon name="close" />
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { getChannel, getAllchannel } from '@/api/channel'
import { getArticles } from '@/api/article'
import { setItem, getItem } from '@/utils/storage'
// import { getAdvice } from '@api/search'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isShow: false, // 弹层是否显示
      allChannels: [],
      isclose: false// 编辑状态下的关闭按钮是否显示
    }
  },
  methods: {
    // 对于弹层里面的推荐的点击处理方法
    tuijiandel (index) {
      this.active = index
      this.isShow = false
    },
    // 点击切换频道或删除频道
    qhanddel (index) {
      if (this.isclose) {
        this.channels.splice(index, 1)
      } else {
        this.tuijiandel(index + 1)
        // this.active = index// 切换到对应的频道
        // this.isShow = false// 关闭弹层
      }
    },
    // 从推荐频道中向我的频道进行添加
    addchannel (a) {
      this.channels.push(a)
    },
    // 下拉加载刷新
    async onRefresh () {
      // 将不同的tab对应不同的channel
      const currentChannel = this.channels[this.active]
      let { data } = await getArticles({
        channel_id: currentChannel.id, // 发送的当前频道
        timestamp: Date.now(), // 最新的时间戳
        with_top: 1
      })
      currentChannel.article.unshift(...data.data.results)
      this.$toast('刷新成功')
      currentChannel.isLoading = false
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      //   currentChannel.isLoading = false
      // }, 500)
    },
    // 当组件滚动到底部时，会触发load事件，调用此函数
    async  onLoad () {
      // 将不同的tab对应不同的channel
      const currentChannel = this.channels[this.active]
      // 获取当前频道的内容
      let { data } = await getArticles({
        channel_id: currentChannel.id, // 发送的当前频道
        timestamp: currentChannel.timestamp || Date.now(), // 时间戳
        with_top: 1
      })
      // console.log(data)
      // 将结果赋给当前频道的文章
      currentChannel.article.push(...data.data.results)
      // console.log(currentChannel.article)
      // 加载状态结束
      currentChannel.loading = false
      // currentChannel.article = currentChannel.article.concat(data.data.results)
      // currentChannel.article = data.data.results
      // 将时间戳赋值给当前频道的时间戳
      if (data.data.pre_timestamp) {
        currentChannel.timestamp = data.data.pre_timestamp
      } else {
        currentChannel.finished = true
      }
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     currentChannel.article.push(currentChannel.article.length + 1)
      //   }
      //   // 加载状态结束
      //   currentChannel.loading = false

      //   // 数据全部加载完成
      //   if (currentChannel.article.length >= 40) {
      //     currentChannel.finished = true
      //   }
      // }, 500)
    },
    // 获取我的频道
    async getChannel () {
      let arrchannels = []
      let localChannel = getItem('channel')
      if (localChannel) {
        arrchannels = localChannel
      } else {
        let { data } = await getChannel()
        arrchannels = data.data.channels
      }
      // 获取用户选取的所有的频道列表，将其渲染页面
      // let { data } = await getChannel()
      // 为每个频道列表加一个属性article
      this.fzchannels(arrchannels)
      // arrchannels.forEach((item) => {
      //   item.article = []// 为了之后点击哪个频道，就加载哪个频道下的文章列表，forEach改变原数组
      //   item.loading = false
      //   item.finished = false
      //   item.timestamp = null// 给当前频道增加时间戳属性
      //   item.isLoading = false
      // })
      this.channels = arrchannels
    },
    // 获取所有的频道
    async  getAllchannels () {
      let { data } = await getAllchannel()
      const allChannels = data.data.channels
      this.fzchannels(allChannels)
      // allChannels.forEach((item) => {
      //   item.article = []// 为了之后点击哪个频道，就加载哪个频道下的文章列表，forEach改变原数组
      //   item.loading = false
      //   item.finished = false
      //   item.timestamp = null// 给当前频道增加时间戳属性
      //   item.isLoading = false
      // })
      // debugger
      this.allChannels = allChannels
    },
    // 封装给我的频道和全部频道增加属性
    fzchannels (arr) {
      arr.forEach((item) => {
        item.article = []// 为了之后点击哪个频道，就加载哪个频道下的文章列表，forEach改变原数组
        item.loading = false
        item.finished = false
        item.timestamp = null// 给当前频道增加时间戳属性
        item.isLoading = false
      })
    }

  },
  watch: {
    channels (newValue) {
      setItem('channel', newValue)
    }
  },
  computed: {
    // 计算属性用于获取剩余频道
    resChannels () {
      const array = []
      this.allChannels.forEach((allchannel, index) => {
        let res = this.channels.find((channel, index) => {
          return channel.id === allchannel.id
        })// 如果find结果为true，返回该存在的对象，否则返回undefind
        if (!res) {
          array.push(allchannel)
        }
      })
      // debugger
      return array
    }
  },
  created () {
    this.getChannel()
    // this.getArticles()
    this.getAllchannels()
  }
}

</script>

<style lang="less" scoped>
.home {
  .van-tabs /deep/ .van-tabs__wrap--scrollable {
    position: fixed;
    left: 0;
    right: 16px;
    top: 46px;
    z-index: 2;
  }
  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .meta span {
      margin-right: 10px;
    }
  }
  .van-list {
    margin-top: 90px;
  }
  .wap-nav {
    position: sticky;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
  }
  .icon {
    position: fixed;
    left: 20px;
    top: 100px;
  }
  .my {
    position: relative;
    margin-top: 50px;
  }
  .righticon {
    position: absolute;
    right: -1px;
    top: -3px;
  }
}
</style>
