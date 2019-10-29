<template>
  <div>
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @input="changeValue"
      @search="onSearch"
    >

      <van-button
        type="info"
        slot="action"
        size="small"
        @click="onSearch(searchText)"
      >搜索</van-button>
    </van-search>
    <!-- 联想建议 -->
    <van-cell-group v-if="searchText">
      <van-cell
        v-for="(item,index) in adviceArr"
        :key="index"
        @click="onSearch(item)"
      >
        <div
          slot="title"
          v-html="delheight (item)"
        >
        </div>
        <van-icon
          name="close"
          slot="right-icon"
          size="18px"
        />
        <van-icon
          name="search"
          slot="icon"
          size="18px"
        />
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template>
          <span @click="searchHistories=[]">全部删除</span>&nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </template>
        <van-icon
          name="delete"
          @click="isDeleteShow=true"
        />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistories"
        :key="item"
        @click="onSearch(item)"
      >
        <van-icon
          name="close"
          @click.stop="searchHistories.splice(index, 1)"
          v-if="isDeleteShow"
        />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getAdvice } from '@/api/search'
import { getItem, setItem } from '@/utils/storage.js'
import { debounce } from 'loadsh'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      adviceArr: [],
      isDeleteShow: true, // 删除的显示与隐藏
      searchHistories: getItem('search-history') || []// 搜索记录
    }
  },
  watch: {
    searchHistories (newValue) {
      setItem('search-history', newValue)
    }
  },
  methods: {

    async  onSearch (str) {
      if (!str.length) {
        return
      }
      // 看记录是否在历史记录数组中存在,若存在返回索引，不存在返回-1
      const index = this.searchHistories.indexOf(str)
      if (!index === -1) {
        // 若存在，则将其删除
        this.searchHistories.splice(index, 1)
      }
      // 若不存在，则将其添加到最前面
      this.searchHistories.unshift(str)

      // 将数组保存到本地
      setItem('search-history', this.searchHistories)

      // 跳转到搜索结果页面
      this.$router.push(`/search/${str}`)
    },
    // 处理文字高亮
    delheight (text) {
      // console.log(text)

      // 根据一个字符串创建一个正则表达式对象
      const reg = new RegExp(this.searchText, 'gi')
      // console.log(reg)

      return text.replace(reg, '<span style="color:red">' + this.searchText + '</span>')
    },
    // 输入时，显示搜索建议
    // async  changeValue () {
    changeValue: debounce(async function () {
      // console.log(this.searchText)
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const { data } = await getAdvice({ q: searchText })
      this.adviceArr = data.data.options
      // const reg = new RegExp(searchText, 'g')
      // adviceArr.forEach((item, index) => {
      //   adviceArr[index] = item.replace(reg, '<span style="color: red">' + searchText + '</span>')
      //   // adviceArr[index] = item.replace(reg, '<span style="color:red">' + searchText + '</span>')
      // })
      // this.adviceArr = adviceArr
    }, 300)
  }

}

</script>

<style>
</style>
