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
              Excel加解密模块
            </p>
            <Row>
            <p>
              提示：本模块主要针对Excel文件，保序加密算法用来进行关系运算(检索)，算术加密算法用来进行数值数据的加减乘除运算
            </p>
            </Row>
          </Card>
      </i-col>
    </Row>
    <Row :gutter="14" class="margin-top-10">
      <i-col span="12" class="padding-left-10">
        <Card title="加密属性" class="card-left" >
          <Row>
            <td style="width:120px;">
              <span label="加解密属性">加解密属性:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="searchKey" class="search-col" @on-change="initMethod" placeholder="请选择加解密属性">
              <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
          </Row>
        </Card>
      </i-col>
      <i-col span="12" class="padding-left-10">
        <Card title="加密算法" class="card-right">
          <Row>
            <td style="width:120px;">
              <span label="加解密算法">加解密算法:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="searchMethod" class="search-col" @on-change="getSelected" placeholder="请选择加解密算法">
              <Option v-for="item in methodz" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
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
            <Row>
            <div class="ivu-upload-list-file" v-if="file !== null">
              <Icon type="logo-buffer"></Icon>
              <span style="margin-top: 5px;"> 选择的属性和方法：</span>
              <Input class="search-input" v-model="showValue" style="margin-top: 12px;"/>
            </div>
            </Row>
            <Row class="margin-top-10">
              <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
            </Row>
            <Row class="margin-top-10">
            <td style="width:80px;">
              <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
              <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
              </Upload>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforePropertyEncrypt()">属性加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforePropertyDecrypt()">属性解密</Button>
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
import excel from '@/libs/excel'
import { DecryptExcel, EncryptExcel, UploadExcel } from '@/api/encrypt'
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
      // console.log(file)
      if (this.file === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行加密操作。'
        })
      } else if (this.searchValue === null) {
        this.$Notice.warning({
          title: '参数不全',
          desc: '请选择加密属性和加密算法。'
        })
      } else if (this.searchValue.indexOf(this.searchKey) !== -1) {
        this.$Notice.warning({
          title: '属性重复选择',
          desc: '该属性已经选择了，请选择其他属性。'
        })
      } else {
        this.handlePropertyEncrypt()
      }
      return false
    },
    handlePropertyEncrypt () {
      console.log(this.searchValue)
      console.log(this.file)
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('arrSelect', this.searchValue)
      formData.append('type', 0)
      // propertyEncrypt(this.searchValue, this.File)
      // // propertyEncrypt(this.searchValue)
      //   .then(res => {
      //     console.log('-----------获取登录信息---------------')
      //     console.log(res)
      //   })
      EncryptExcel(formData).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$Message.success('加密成功')
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
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
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
        const data = e.target.result
        // console.log(data)
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => { return { title: item, key: item } })
        var index = 1
        header.forEach(item => this.columns.push({ key: index++, title: item }))
        this.tableData = results.slice(0, 5)
        this.tableTitle = tableTitle
        this.uploadLoading = false
        this.tableLoading = false
        this.showRemoveFile = true
        console.log(this.tableData)
        console.log(this.tableTitle)
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
  width: 15%;
}
</style>
