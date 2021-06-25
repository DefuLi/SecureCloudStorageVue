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
    <Card>
      <div>
        <h1>文件管理器</h1>
        <filemanager
          @bfuploadBefore="bfuploadBefore"
        ></filemanager>
      </div>
    </Card>
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
              <!--<a class='link-type' href='javascript:void(0)' icon="ios-cloud-upload-outline" @click="handleBeforePropertyDecrypt()">BF解密</a>-->
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleRemove()">清空</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="bfupload()">云端BF加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="bfdownload()">云端BF解密</Button>
            </td>
            <td class="td-space"></td>
          </Row>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
// import excel from '@/libs/excel'
import file_manager_page from '@/view/file-manager/file_manager_page.vue'
import { EncryptBF, DecryptBF, Encryptbfupload, Encryptbfdownload } from '@/api/bf'
import InforCard from '../../components/info-card/infor-card'
// import { propertyEncrypt, propertyDecrypt } from '@/api/encrypt'
export default {
  name: 'excel-ende',
  components: {
    InforCard,
    'filemanager': file_manager_page
  },
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
      clouddata: [],
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
    handleUploadFile () {
      this.initUpload()
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
      formData.append('username', this.$store.getters.userName)
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
      if (this.file !== null) {
        this.handlePropertyDecrypt()
      } else if (this.file === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择加密的文件进行操作'
        })
      }
      return false
    },
    handlePropertyDecrypt () {
      // console.log(this.searchValue)
      console.log(this.file)
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('username', this.$store.getters.userName)
      DecryptBF(formData).then((data) => {
        console.log(data)
        console.log(data.data.type)
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(data.data)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取文件名
        let fileName = '下载文件' + data.data.type
        // download 属性定义了下载链接的地址而不是跳转路径
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })

      //   console.log(res)
      //   if (res.data === 1) {
      //     this.$Message.success('解密成功')
      //     this.initUpload()
      //   } else {
      //     this.$Message.error('解密失败')
      //     this.initUpload()
      //   }
      // })
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
    },
    bfuploadBefore (data) {
      console.log(data)
      // console.log(data[0].createUserName)
      this.clouddata = data
    },
    bfupload () {
      this.clouddata.forEach(item => {
        let formData = new FormData()
        // console.log(item.createUserName)
        // console.log(item.ParentId)
        // console.log(this.$store.getters.userName)
        // console.log(item.Name)
        formData.append('CreateUserName', item.CreateUserName)
        formData.append('ParentId', item.ParentId)
        formData.append('LoginUserName', this.$store.getters.userName)
        formData.append('FileName', item.Name)
        console.log(formData)
        Encryptbfupload(formData).then(res => {
          console.log(res)
          if (res.data === 'nofile') {
            this.$Message.error('云端没有该文件')
          } else if (res.data === 'nocert') {
            this.$Message.error('该文件没有证书权限')
          } else if (res.data === 'failed') {
            this.$Message.error('该文件加密失败')
          } else {
            this.$Message.success(res.data + '加密成功')
          }
        })
      })
    },
    bfdownload () {
      this.clouddata.forEach(item => {
        let formData = new FormData()
        // console.log(item.createUserName)
        // console.log(item.ParentId)
        // console.log(this.$store.getters.userName)
        // console.log(item.Name)
        formData.append('CreateUserName', item.CreateUserName)
        formData.append('ParentId', item.ParentId)
        formData.append('LoginUserName', this.$store.getters.userName)
        formData.append('FileName', item.Name)
        console.log(formData)
        Encryptbfdownload(formData).then(res => {
          console.log(res)
          if (res.data === 'nofile') {
            this.$Message.error('云端没有该文件')
          } else if (res.data === 'nocert') {
            this.$Message.error('该文件没有解密证书权限')
          } else if (res.data === 'failed') {
            this.$Message.error('该文件解密失败')
          } else {
            this.$Message.success(res.data + '解密成功')
          }
        })
      })
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
