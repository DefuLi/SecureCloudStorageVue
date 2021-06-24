<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
// import { login } from '../../api/user'
// import { setToken } from '../../libs/util'
// import { actions } from '../../store/module/user'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      // let _this = this
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     console.log(res)
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
      this.handleLogin({ userName, password })
      // login({ userName, password })
        .then(res => {
          console.log('-----------获取登录信息---------------')
          console.log(res)
          // localStorage.setItem('userName',this.params.userName)
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName

            })
          })
          // this.$router.push({
          //   name: this.$config.homeName
          // })
          // if (res.data.code === 1) {
          //   // _this.$message({
          //   //   message: '登录成功',
          //   //   type: 'success'
          //   // })
          //   console.log('登录成功')
          //   this.$store.commit('setToken', res.data.token)
          //   this.$router.push({
          //     name: this.$config.homeName
          //   })
          // } else {
          //   this.notify('用户名或密码错误', 'error')
          //   console.log('登录失败')
          // }
        })
    }
  }
}
</script>

<style>

</style>
