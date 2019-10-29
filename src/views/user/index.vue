<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-right="onSave"
      @click-left="$router.push('/my')"
    />
    <van-cell-group>
      <van-cell
        title="头像"
        is-link
        @click="onPhoto"
      >
        <van-image
          round
          width="30"
          height="30"
          :src="user.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow=true"
      />
      <!-- 编辑用户昵称弹窗 -->
      <van-dialog
        v-model="isEditNameShow"
        title="用户昵称"
        show-cancel-button
        @confirm="onUserNameConfirm"
      >
        <van-field
          placeholder="请输入用户名"
          :value="user.name"
          @input="onUserNameInput"
        />
      </van-dialog>
      <!-- /编辑用户昵称弹窗 -->
      <van-cell
        title="性别"
        :value="user.gender==1?'女':'男'"
        is-link
        @click="isEditGenderShow=true"
      />
      <!-- 编辑用户昵称上拉菜单 -->
      <van-action-sheet
        v-model="isEditGenderShow"
        :actions="actions"
        @select="onSelect"
        :close-on-click-action="true"
      />
      <!-- /编辑用户昵称上拉菜单 -->
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isEditBirthdayShow=true"
      />
      <!-- 编辑用户生日 -->
      <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          type="date"
          @confirm="onUserBirthdayConfirm"
          @cancel="isEditBirthdayShow = false"
        />
      </van-popup>
      <!-- /编辑用户生日 -->
    </van-cell-group>
    <!--
      表单元素的 hidden 表示隐藏这个表单元素
     -->
    <input
      hidden
      type="file"
      ref="file"
      @change="onFileChange"
    >
  </div>
</template>

<script>
import { getProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {},
      isEditNameShow: false, // 对话框的显示与隐藏
      inputName: '', // 储存输入框的值
      isEditGenderShow: false, // 上拉菜单的显示与隐藏
      actions: [{ name: '男', value: 0 }, { name: '女', value: 1 }],
      isEditBirthdayShow: false// 是否显示生日弹层
    }
  },
  methods: {
    // 选择日期后，选择确认
    onUserBirthdayConfirm (value) {
      // console.log(value)
      this.user.birthday = dayjs(value).format('YYYY-MM-DD')
      this.isEditBirthdayShow = false
    },
    // 当选中选项时，触发事件
    onSelect (item, index) {
      // 因为数据库中性别用0，1显示，因此要设置value的值，以便储存
      this.user.gender = item.value
    },
    // 点击确认时，将输入框内的值给原来的user.name
    onUserNameConfirm () {
      this.user.name = this.inputName
    },
    // 当输入昵称时，将其值赋值给inputName
    onUserNameInput (value) {
      this.inputName = value
    },
    // 保存提交用户头像
    async  onSave () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })

      try {
        const fileobj = this.$refs.file.files[0]
        if (fileobj) {
          const formData = new FormData()
          // formData.append('名字', 数据)
          formData.append('photo', fileobj)
          await updateUserPhoto(formData)
        }

        await updateUserProfile({
          name: this.user.name,
          gender: this.user.gender,
          birthday: this.user.birthday
        })
        this.$toast.success('保存成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('保存失败')
      }
    }, //       let formdata = new FormData()
    //       formdata.append('photo', this.$refs.file.files[0])
    //       let { data } = await updateUserPhoto(formdata)
    // this.user.photo = data.data.photo

    // 点击的转换
    onPhoto () {
      this.$refs.file.click()
    },
    // 图片预览
    onFileChange () {
      // 获取dom对象
      // console.dir(this.$refs.file)
      this.user.photo = window.URL.createObjectURL(this.$refs.file.files[0])
    },
    // 获取用户信息
    async  getUser () {
      let { data } = await getProfile()
      this.user = data.data
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left,
.van-nav-bar__text {
  color: #fff;
}
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
