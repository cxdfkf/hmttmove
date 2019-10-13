<template>
  <div class="login">
    <van-nav-bar title="标题" />
    <ValidationObserver ref="userForm">
      <van-cell-group>
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <!-- <p>{{errors[0]}}</p> -->
          <van-field required clearable label="手机号" v-model="user.mobile" placeholder="请输入手机号"
            :error-message="errors[0]" />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|max:6" v-slot="{ errors }">
          <van-field type="password" label="验证码" v-model="user.code" placeholder="请输入验证码"
            :error-message="errors[0]" required />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <div class="btn-wrap">
      <van-button type="info" class="btn" @click="loginYz">登录</van-button>
    </div>

  </div>

</template>

<script>
import { userYz } from '@/api/user'
import { setItem } from '@/utils/storage'
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
      // loading开启
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner'
      })
      try {
        const { data } = await userYz(this.user)
        const isValid = await this.$refs.userForm.validate()// 表单验证登录信息
        if (!isValid) {
          return
        }
        // loading关闭
        toast.clear()
        this.$toast.success('登录成功')
        this.$store.commit('tokenModify', data.data)// 将token放入到vuex容器中
        setItem('user', data.data)// 将token存储到本地
      } catch (error) {
        // console.log(error)
        // loading关闭
        toast.clear()
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
