<template>
  <div>
    <el-table
      :data="certList"
      style="width: 100%">
      <el-table-column
        prop="authorizeduser"
        label="被授权的用户"
        width="200">
      </el-table-column>
      <el-table-column
        prop="accesstype"
        label="授权的权限"
        width="200">
      </el-table-column>
      <el-table-column
        prop="cert"
        label="证书"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
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
    <el-radio v-model="radio" label='1'>只读权限</el-radio>
    <el-radio v-model="radio" label='2'>读写权限</el-radio>
    <el-row>
      <el-button type="primary" @click="addCert" plain>生成证书</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import { getCertList, newCreatCert, deleteCert } from '@/api/cert'
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
    console.log(this.$route.params.input === undefined)
    // console.log(this.$route.params.radio.toString())
    if (this.$route.params.input !== undefined) {
      this.input = this.$route.params.input
      this.radio = this.$route.params.radio.toString()
    }
    // console.log(this.radio)
    this.getcertList(this.authoruser)
  },
  methods: {
    getcertList () {
      getCertList(this.authoruser)
        .then(res => {
          console.log(res.data[0])
          res.data.forEach(item => this.certList.push(item))
          console.log(this.certList)
        })
    },
    deleteRow (index, rows) {
      let formData = new FormData()
      formData.append('authorizeduser', this.certList[index].authorizeduser)
      formData.append('authoruser', this.authoruser)
      formData.append('accesstype', this.certList[index].accesstype)
      deleteCert(formData)
      rows.splice(index, 1)
      console.log(index)
    },
    addCert (input, radio) {
      console.log(this.radio)
      if (this.radio === '1') { this.accesstype = '读' } else { this.accesstype = '读写' }
      let formData = new FormData()
      formData.append('accesstype', this.accesstype)
      formData.append('authoruser', this.input)
      formData.append('myname', this.authoruser)
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
