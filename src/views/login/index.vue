<template>
  <div class="login">
    <van-nav-bar title="标题" />
    <van-cell-group>
      <van-field required clearable label="手机号" v-model="user.mobile" placeholder="请输入手机号" />

      <van-field type="password" label="验证码" v-model="user.code" placeholder="请输入验证码" required />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="info" class="btn" @click="loginYz">登录</van-button>
    </div>

  </div>

</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async  loginYz () {
      try {
        await request({
          url: '/app/v1_0/authorizations',
          data: this.user,
          method: 'post'
        })
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)

        if (error.response && error.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
    }
  }
}
</script >

<style  scoped lang="less">
.login {
  .btn-wrap {
    padding: 20px;
    .btn {
      width: 100%;
      background-color: #6db4fd;
      color: #fff;
    }
  }
}
</style>
