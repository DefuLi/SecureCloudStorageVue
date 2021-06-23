<style lang="less">
  @import "./common.less";
</style>
<template>
  <div>
    <Row :gutter="14">
      <i-col>
        <Card>
          <p slot="title">
            <Icon type="ios-analytics"></Icon>
            BF加解密模块
          </p>
          <Row>
            <p>
              提示：本模块针对各种类型的文件，加密算法使用的是RSA算法
            </p>
          </Row>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="14" style="margin-top: 14px;">
      <i-col>
        <Card>
          <!-- <p slot="title">
            <Icon type="ios-analytics"></Icon>
            综合实例
          </p> -->
          <Row>
            <div class="ivu-upload-list-file" v-if="file !== null">
              <Icon type="ios-stats"></Icon>
              选择的文件：{{ file.name }}
              <!-- 选择的文件：{{ filePath }} -->
              <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
            </div>
          </Row>
          <Row>
            <transition name="fade">
              <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                <div v-if="progressPercent == 100">
                  <Icon type="ios-checkmark-circle"></Icon>
                  <span>成功</span>
                </div>
              </Progress>
            </transition>
          </Row>
          <Row class="margin-top-10">
            <td style="width:80px;">
              <Upload action="" :before-upload="handleBeforeUpload" >
                <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
              </Upload>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforePropertyEncrypt()">BF加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforePropertyDecrypt()">BF解密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleRemove()">清空</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadExcel">打开文件</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">打开目录</Button>
            </td>
          </Row>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
// import excel from '@/libs/excel'
import { DecryptExcel, UploadExcel } from '@/api/encrypt'
import { EncryptBF } from '@/api/bf'
// import { propertyEncrypt, propertyDecrypt } from '@/api/encrypt'
export default {
  name: 'excel-ende',
  data () {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      searchValue: null,
      showValue: null,
      file: null,
      filePath: [],
      tableData: [],
      tableTitle: [],
      tableLoading: false,
      searchKey: '-1',
      searchMethod: '-1',
      columns: [{
        key: '-1',
        title: '请选择加解密属性'
      }],
      methodz: [{
        key: '-1',
        title: '请选择加解密算法'
      }, {
        key: '1',
        title: '保序加密算法'
      }, {
        key: '2',
        title: '算数加密算法'
      }],
      value: ''
    }
  },
  methods: {
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableData = []
      this.tableTitle = []
      this.searchValue = null
      this.showValue = null
      this.tableTtl = []
      this.tableDta = []
      this.columns = [{
        key: '-1',
        title: '请选择加解密属性'
      }]
    },
    initMethod () {
      this.searchMethod = this.methodz[0].key
      // console.log('初始化')
      // console.log(this.searchMethod)
    },
    getSelected () {
      // console.log(this.searchMethod)
      // console.log(this.searchKey)
      if (this.searchMethod !== null && this.searchMethod !== '-1' && this.searchKey !== '-1') {
        if (this.searchValue === null) {
          this.searchValue = []
          this.showValue = []
          this.searchValue.push(this.searchKey + ',' + this.searchMethod)
          this.showValue.push(this.columns[this.searchKey].title + ',' + this.methodz[this.searchMethod].title)
        } else {
          this.searchValue = this.searchValue + '#' + this.searchKey + ',' + this.searchMethod
          this.showValue = this.showValue + '；' + this.columns[this.searchKey].title + ',' + this.methodz[this.searchMethod].title
        }
        // this.searchValue.push(this.columns[this.searchKey + 1].title + ',' + this.methodz[this.searchMethod].title)
        this.searchKey = this.columns[0].key
      }
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleUploadExcel () {
      this.initUpload()
      this.uploadLoading = true
      this.tableLoading = true
      // this.showProgress = true
      UploadExcel().then(res => {
        console.log(res)
        console.log(JSON.parse(res.data.tableData))
        var index = 1
        res.data.tableHead.forEach(item => this.tableTtl.push({ key: item, title: item }))
        res.data.tableHead.forEach(item => this.columns.push({ key: index++, title: item }))
        JSON.parse(res.data.tableData).forEach(item => this.tableDta.push(item))
        this.tableTitle = this.tableTtl
        this.tableData = this.tableDta
        // this.tableTitle = res.data.tableHead
        this.showRemoveFile = true
        this.uploadLoading = false
        this.tableLoading = false
        this.file = res.data.filename
        // this.file.name = res.data.filename
        this.filePath = res.data.filename
        console.log(this.file.name)
      })
    },
    // handlePropertyEncrypt () {
    //   console.log(this.searchValue)
    //   console.log(this.file)
    //   propertyEncrypt(this.searchValue, this.File)
    //   // propertyEncrypt(this.searchValue)
    //     .then(res => {
    //       console.log('-----------获取登录信息---------------')
    //       console.log(res)
    //     })
    // },
    handleBeforePropertyEncrypt () {
      console.log(this.file)
      if (this.file !== null) {
        this.handlePropertyEncrypt()
      } else if (this.file === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择文件进行BF加密操作。'
        })
      }
      return false
    },
    handlePropertyEncrypt () {
      // console.log(this.searchValue)
      console.log(this.file)
      let formData = new FormData()
      formData.append('file', this.file)
      // formData.append('arrSelect', this.searchValue)
      // formData.append('type', 0)
      // propertyEncrypt(this.searchValue, this.File)
      // // propertyEncrypt(this.searchValue)
      //   .then(res => {
      //     console.log('-----------获取登录信息---------------')
      //     console.log(res)
      //   })
      EncryptBF(formData).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$Message.success('加密成功')
          this.initUpload()
        } else if (res.data === 0) {
          this.$Message.success('部分加密成功')
          this.initUpload()
        } else {
          this.$Message.error('加密失败')
          this.initUpload()
        }
      })
    },
    handleBeforePropertyDecrypt () {
      // console.log(file)
      if (this.searchValue !== null && this.file !== null) {
        this.handlePropertyDecrypt()
      } else if (this.file === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行解密操作。'
        })
      } else {
        this.$Notice.warning({
          title: '参数不全',
          desc: '请选择解密属性和解密算法。'
        })
      }
      return false
    },
    handlePropertyDecrypt () {
      // console.log(this.searchValue)
      console.log(this.file)
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('arrSelect', this.searchValue)
      formData.append('type', 1)
      DecryptExcel(formData).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$Message.success('解密成功')
          this.initUpload()
        } else if (res.data === 0) {
          this.$Message.pop('部分解密成功')
          this.initUpload()
        } else {
          this.$Message.error('解密失败')
          this.initUpload()
        }
      })
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      // console.log(file)
      // const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      this.readFile(file)
      this.file = file

      return true
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      // reader.readAsDataURL(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.tableLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$Message.info('文件读取成功')
        this.uploadLoading = false
        //  const data = e.target.result
        //  console.log(data)
      }
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style>
  /* .card-left {
    width: 50%;
  }
  .card-right {
    width: 50%;
  } */
  .td-space {
    width: 10%;
  }
</style>
