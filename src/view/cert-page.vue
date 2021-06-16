<template>
  <div>
  <el-table
    :data="certList"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="被授权的用户"
      width="300">
    </el-table-column>
    <el-table-column
      prop="access"
      label="授权的权限"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, certList)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-input v-model="input" placeholder="被授权者用户名"></el-input>
    <el-radio v-model="radio" label="1">只读权限</el-radio>
    <el-radio v-model="radio" label="2">读写权限</el-radio>
  <el-row>
    <el-button type="primary" @click="addCert" plain>生成证书</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="info" plain>信息按钮</el-button>
  </el-row>
  </div>
</template>

<script>
import { getCertList, newCreatCert } from '@/api/cert'
// import { getUserInfo } from '../api/user'
export default {
  data () {
    return {
      certList: [],
      authoruser: 'admin',
      input: '',
      radio: '1',
      accesstype: ''
    }
  },
  created () {
    //  this.authoruser = localStorage.getItem('userName');
    //  this.authoruser = this.$store.state.data.userName
    this.getcertList(this.authoruser)
  },

  methods: {
    getcertList (authoruser) {
      getCertList(authoruser)
        .then(res => {
          console.log(res)
        })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    addCert (input, radio) {
      if (radio === 1) this.accesstype = '读'
      else this.accesstype = '读写'
      let formData = new FormData()
      formData.append('accesstype', this.accesstype)
      formData.append('myname', this.input)
      formData.append('authoruser', this.authoruser)
      console.log(this.accesstype)
      console.log(this.input)
      console.log(this.authoruser)
      newCreatCert(formData)
        .then(res => {
          console.log('1')
        })
      // creatCert(this.authoruser, this.input, this.accesstype)
      //   .then(res => {
      //     console.log('1')
      //   })
    }
  }

}
</script>
