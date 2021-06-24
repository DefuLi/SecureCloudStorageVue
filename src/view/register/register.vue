<style lang="less">
  @import './register.less';
</style>

<template>
  <div class="register">
    <div class="register-con">
      <Card icon="log-in" title="新用户注册" :bordered="false">
        <div class="form-con">
          <register-form @on-success-valid="handleSubmit"></register-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import RegisterForm from '_c/register-form'
import { register } from '../../api/user'
// import { setToken } from '../../libs/util'
// import { actions } from '../../store/module/user'
import { mapActions } from 'vuex'
export default {
  components: {
    RegisterForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      // this.handleLogin({ userName, password })
      register({ userName, password })
        .then(res => {
          console.log('-----------获取登录信息---------------')
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
