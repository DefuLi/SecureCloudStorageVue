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
              Excel密文运算模块
            </p>
            <Row>
            <p>
              提示：请选择Excel文件，进行密文的关系运算和算术运算。保序加密算法用来进行关系运算(检索)，算术加密算法用来进行数值数据的加减乘除运算
            </p>
            </Row>
          </Card>
          <Card class="margin-top-10">
            <Row class="margin-top-10">
              <Icon type="ios-stats"></Icon>
                <!-- 选择的文件：{{ file.name }} -->
                选择的文件：{{ filePath }}
              <Icon v-show="showRemoveFile" type="ios-close" class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
            </Row>
            <Row class="margin-top-10">
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
              <Icon type="logo-buffer"></Icon>
              选择的文件信息: {{ showValue }}
            </Row>
          </Card>
      </i-col>
    </Row>
    <Row :gutter="14" class="margin-top-10">
      <i-col span="12" class="padding-left-10">
        <Card title="保序加密" class="card-left" >
          <Row>
            <td style="width:120px;">
              <span label="保序加密属性">保序加密属性:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="opeProperty" class="search-col" @on-change="initMethod" placeholder="请选择保序加密属性">
              <Option v-for="item in opeColumns" :value="item.title" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;">
              <span style="margin-top: 15px;" label="保序加密关键字">保序加密关键字:</span>
            </td>
            <td style="width:10px;"></td>
            <td>
              <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="opeKey" />
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;" class="margin-top-10">
              <span label="下边界">下边界:</span>
            </td>
            <td style="width:10px;"></td>
            <td>
              <Input clearable placeholder="输入下边界搜索" class="search-input" v-model="opeLowBound" />
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;" class="margin-top-10">
              <span label="上边界">上边界:</span>
            </td>
            <td style="width:10px;"></td>
            <td>
              <Input clearable placeholder="输入上边界搜索" class="search-input" v-model="opeUpBound" />
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;" class="margin-top-10">
              <span label="保序信息">保序信息:</span>
            </td>
            <td style="width:10px;"></td>
            <!-- <Input class="search-input" v-model="opeResult" style="margin-top: 12px;" :span="12"/> -->
          </Row>
          <Row style="margin-top: 12px;">
            {{ opeEncInfo }}
          </Row>
        </Card>
      </i-col>
      <i-col span="12" class="padding-left-10">
        <Card title="算术加密" class="card-right">
         <Row>
            <td style="width:120px;">
              <span label="算术加密属性">算术加密属性:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="arithProperty" class="search-col" @on-change="initMethod" placeholder="请选择算术加密属性">
              <Option v-for="item in arithColumns" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;">
              <span label="运算方法">运算方法:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="arithMethod" class="search-col" @on-change="initMethod" placeholder="请选择运算方法">
              <Option v-for="item in methodz" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;">
              <span label="记录选择">记录选择:</span>
            </td>
            <td style="width:10px;"></td>
            <td style="width:170px;">
              <Select v-model="arithRecord" class="search-col" @on-change="initMethod" >
              <Option v-for="item in recordz" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
              </Select>
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;" class="margin-top-10">
              <span label="算术关键字">算术关键字:</span>
            </td>
            <td style="width:10px;"></td>
            <td>
              <Input class="search-input" v-model="arithKey" />
            </td>
            <td style="width:10px;"></td>
            <td style="width:120px;" class="margin-top-10">
              <span label="行">行</span>
            </td>
          </Row>
          <Row style="margin-top: 12px;">
            <td style="width:120px;" class="margin-top-10">
              <span label="算术信息">算术信息:</span>
            </td>
            <td style="width:10px;"></td>
            <!-- <Input class="search-input" v-model="opeResult" style="margin-top: 12px;" :span="12"/> -->
          </Row>
           <Row style="margin-top: 12px;">
            {{ arithEncInfo }}
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
            <!-- <Row class="margin-top-10">
              <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
            </Row> -->
            <Row class="margin-top-10">
            <!-- <td style="width:80px;">
              <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
              <Button icon="ios-cloud-upload-outline" @click="handleUploadFile">上传文件</Button>
              </Upload>
            </td> -->
            <!-- <td class="td-space"></td> -->
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleUploadExcel">打开文件</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforeOpeKeyEncrypt()">保序关键字加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforeOpePropertyEncrypt()">保序范围加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforeRelationComputation()">关系运算</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforeArithKeyEncrypt()">算术关键字加密</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleBeforeArithEncrypt()">算术运算</Button>
            </td>
            <td class="td-space"></td>
            <td>
              <Button icon="ios-cloud-upload-outline" @click="handleRemove()">清空</Button>
            </td>
          </Row>
          </Card>
          <Modal
                v-model="modalVisible"
                @on-cancel="cancel"
                :title="'消息'">
                <p>{{ opeResult }}</p>
            </Modal>
      </i-col>
    </Row>
  </div>
</template>
<script>
import excel from '@/libs/excel'
import { OpePropertyEncrypt, OpeKeyEncrypt, ExcelOperationUpload, RelationComputation, ArithKeyEncrypt, ArithEncrypt } from '@/api/encrypt'
// import { propertyEncrypt, propertyDecrypt } from '@/api/encrypt'
export default {
  name: 'excel-operation',
  data () {
    return {
      arithEncInfo: null,
      modalVisible: false,
      fileParentPath: null,
      opeEncInfo: null,
      opeResult: null,
      showProgress: false,
      showRemoveFile: false,
      showValue: null,
      arithMethod: null,
      arithKey: null,
      opeProperty: null,
      opeKey: null,
      opeLowBound: null,
      opeUpBound: null,
      arithProperty: null,
      arithRecord: null,
      file: null,
      filePath: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false,
      searchKey: '-1',
      searchMethod: '-1',
      columns: [{
        key: '-1',
        title: '请选择加解密属性'
      }],
      arithColumns: [{
        key: '-1',
        title: '请选择算术加密属性'
      }],
      opeColumns: [{
        key: '-1',
        title: '请选择保序加密属性'
      }],
      methodz: [{
        key: '0',
        title: '加法'
      }, {
        key: '1',
        title: '减法'
      }, {
        key: '2',
        title: '乘法'
      }, {
        key: '3',
        title: '除法'
      }],
      recordz: [{
        key: '0',
        title: '全部记录'
      }, {
        key: '1',
        title: '单行记录'
      }, {
        key: '2',
        title: '保序条件记录'
      }],
      value: ''
    }
  },
  methods: {
    initUpload () {
      this.fileParentPath = null
      this.opeResult = null
      this.opeEncInfo = null
      this.opeKey = null
      this.file = null
      this.filePath = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableData = []
      this.tableTitle = []
      this.searchValue = null
      this.showValue = null
      this.tableTtl = []
      this.tableDta = []
      this.opeUpBound = null
      this.opeLowBound = null
      this.arithColumns = [{
        key: '-1',
        title: '请选择算术加密属性'
      }]
      this.opeColumns = [{
        key: '-1',
        title: '请选择保序加密属性'
      }]
    },
    cancel () {
      this.opeLowBound = null
      this.opeUpBound = null
      this.opeKey = null
      this.opeProperty = null
    },
    initMethod () {
      this.searchMethod = this.methodz[0].key
      // console.log('初始化')
      // console.log(this.searchMethod)
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleUploadExcel () {
      this.initUpload()
      // this.uploadLoading = true
      this.tableLoading = true
      // this.showProgress = true
      ExcelOperationUpload().then(res => {
        console.log(res)
        // console.log(JSON.parse(res.data.tableData))
        var index = 1
        res.data.arith.forEach(item => this.arithColumns.push({ key: index++, title: item }))
        index = 1
        res.data.opes.forEach(item => this.opeColumns.push({ key: index++, title: item }))
        res.data.tableHead.forEach(item => this.tableTtl.push({ key: item, title: item }))
        res.data.tableHead.forEach(item => this.columns.push({ key: index++, title: item }))
        // JSON.parse(res.data.tableData).forEach(item => this.tableDta.push(item))
        this.tableTitle = this.tableTtl
        this.tableData = this.tableDta
        // this.tableTitle = res.data.tableHead
        this.showRemoveFile = true
        // this.uploadLoading = false
        this.tableLoading = false
        this.file = res.data.filename
        // this.file.name = res.data.filename
        this.filePath = res.data.filename
        this.fileParentPath = res.data.parentPath
        this.showValue = res.data.tableHead
        console.log(this.file.name)
      })
    },
    handleBeforeOpeKeyEncrypt () {
      if (this.fileParentPath === null || this.filePath === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行密文运算操作。'
        })
      } else if (this.opeProperty === null) {
        this.$Notice.warning({
          title: '保序加密属性',
          desc: '请选择保序加密属性。'
        })
      } else if (this.opeEncInfo !== null && this.opeEncInfo.indexOf(this.opeProperty) !== -1) {
        this.$Notice.warning({
          title: '属性重复选择',
          desc: '该属性已经选择了，请选择其他属性。'
        })
      } else if (this.opeKey === null) {
        this.$Notice.warning({
          title: '保序关键字为空',
          desc: '请填写保序关键字。'
        })
      } else {
        this.handleOpeKeyEncrypt()
      }
    },
    handleOpeKeyEncrypt () { // 保序关键字加密
      // console.log(this.searchValue)
      let formData = new FormData()
      // console.log(this.fileParentPath)
      console.log(this.opeEncInfo)
      formData.append('fileParentPath', this.fileParentPath)
      formData.append('opeProperty', this.opeProperty)
      formData.append('opeKey', this.opeKey)
      formData.append('opeEncInfo', this.opeEncInfo)
      formData.append('type', 0)
      OpeKeyEncrypt(formData).then(res => {
        // console.log(res)
        // console.log(res.data.result)
        if (res.data.code === 1) {
          // this.initUpload()
          this.opeResult = res.data.result
          this.modalVisible = true
          this.opeEncInfo = res.data.opeEncInfo
          this.$Message.success('加密成功')
        } else {
          this.$Message.error('加密失败')
          // this.initUpload()
        }
      })
    },
    handleBeforeOpePropertyEncrypt () {
      if (this.fileParentPath === null || this.filePath === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行密文运算操作。'
        })
        this.handlePropertyDecrypt()
      } else if (this.opeProperty === null) {
        this.$Notice.warning({
          title: '未选择保序加密属性',
          desc: '请选择保序加密属性。'
        })
      } else if (this.opeEncInfo !== null && this.opeEncInfo.indexOf(this.opeProperty) !== -1) {
        this.$Notice.warning({
          title: '属性重复选择',
          desc: '该属性已经选择了，请选择其他属性。'
        })
      } else if (this.opeLowBound === null && this.opeUpBound === null) {
        this.$Notice.warning({
          title: '边界值参数为空',
          desc: '请填写边界值参数。'
        })
      } else if (this.opeUpBound !== null && this.opeLowBound > this.opeUpBound) {
        this.$Notice.warning({
          title: '下边界大于上边界',
          desc: '请填写正确的边界值参数。'
        })
      } else {
        this.handleOpePropertyEncrypt()
      }
    },
    handleOpePropertyEncrypt () { // 保序范围加密
      // console.log(this.searchValue)
      console.log(this.opeEncInfo)
      let formData = new FormData()
      formData.append('fileParentPath', this.fileParentPath)
      formData.append('filePath', this.filePath)
      formData.append('opeProperty', this.opeProperty)
      formData.append('opeLowBound', this.opeLowBound)
      formData.append('opeUpBound', this.opeUpBound)
      formData.append('opeEncInfo', this.opeEncInfo)
      formData.append('type', 0)
      OpePropertyEncrypt(formData).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.opeResult = res.data.result
          this.modalVisible = true
          this.$Message.success('加密成功')
          // this.initUpload()
          // if (this.opeEncInfo === null) {
          //   this.opeEncInfo = res.data.opeEncInfo
          // } else {
          //   this.opeEncInfo = this.opeEncInfo + res.data.opeEncInfo
          // }
          this.opeEncInfo = res.data.opeEncInfo
        } else {
          this.$Message.error('加密失败')
          // this.initUpload()
        }
      })
    },
    handleBeforeRelationComputation () {
      if (this.fileParentPath === null || this.filePath === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行密文运算操作。'
        })
        this.handlePropertyDecrypt()
      } else if (this.opeEncInfo === null) {
        this.$Notice.warning({
          title: '请先进行加密',
          desc: '请先进行保序关键字或范围加密。'
        })
      } else {
        this.handleRelationComputation()
      }
    },
    handleRelationComputation () { // 关系运算
      // console.log(this.searchValue)
      console.log(this.opeEncInfo)
      let formData = new FormData()
      formData.append('fileParentPath', this.fileParentPath)
      formData.append('filePath', this.filePath)
      formData.append('arrSelect', this.searchValue)
      formData.append('opeEncInfo', this.opeEncInfo)
      formData.append('type', 0)
      RelationComputation(formData).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$Message.success('加密成功')
          // this.initUpload()
          this.opeResult = res.data.result
          this.modalVisible = true
          this.opeEncInfo = null
        } else {
          this.$Message.error('加密失败')
          // this.initUpload()
        }
      })
    },
    handleBeforeArithKeyEncrypt () {
      if (this.fileParentPath === null || this.filePath === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行密文运算操作。'
        })
      } else if (this.arithProperty === null) {
        this.$Notice.warning({
          title: '算术加密属性',
          desc: '请选择算术加密属性。'
        })
      } else if (this.arithEncInfo !== null && this.arithEncInfo.indexOf(this.arithProperty) !== -1) {
        this.$Notice.warning({
          title: '属性重复选择',
          desc: '该属性已经选择了，请选择其他属性。'
        })
      } else if (this.arithMethod === null) {
        this.$Notice.warning({
          title: '运算方法为空',
          desc: '请选择运算方法。'
        })
      } else if (this.arithKey === null) {
        this.$Notice.warning({
          title: '算术关键字为空',
          desc: '请填写算术关键字。'
        })
      } else {
        this.handleArithKeyEncrypt()
      }
    },
    handleArithKeyEncrypt () { // 算术关键字加密
      console.log(this.searchValue)
      let formData = new FormData()
      formData.append('filePath', this.filePath)
      formData.append('arrSelect', this.searchValue)
      formData.append('type', 0)
      ArithKeyEncrypt(formData).then(res => {
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
    handleBeforeArithEncrypt () {
      if (this.fileParentPath === null || this.filePath === null) {
        this.$Notice.warning({
          title: '未选择文件',
          desc: '请选择xls或xlxs格式的文件进行密文运算操作。'
        })
      } else if (this.arithProperty === null) {
        this.$Notice.warning({
          title: '算术加密属性',
          desc: '请选择算术加密属性。'
        })
      } else if (this.arithEncInfo !== null && this.arithEncInfo.indexOf(this.arithProperty) !== -1) {
        this.$Notice.warning({
          title: '属性重复选择',
          desc: '该属性已经选择了，请选择其他属性。'
        })
      } else if (this.arithMethod === null) {
        this.$Notice.warning({
          title: '运算方法为空',
          desc: '请选择运算方法。'
        })
      } else if (this.arithKey === null) {
        this.$Notice.warning({
          title: '算术关键字为空',
          desc: '请填写算术关键字。'
        })
      } else {
        this.handleArithEncrypt()
      }
    },
    handleArithEncrypt () { // 算术运算
      console.log(this.searchValue)
      let formData = new FormData()
      formData.append('filePath', this.filePath)
      formData.append('arrSelect', this.searchValue)
      formData.append('type', 0)
      ArithEncrypt(formData).then(res => {
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
        // this.uploadLoading = true
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
        // this.uploadLoading = false
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
.td-space {
  width: 10%;
}
</style>
