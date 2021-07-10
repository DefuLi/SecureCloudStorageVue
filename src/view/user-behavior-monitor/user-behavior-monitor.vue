<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-agree="handleAgree"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserBehavior, agree } from '@/api/data'
export default {
  name: 'behavior_monitor',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '用户名', key: 'userName', sortable: true },
        { title: '文件上传次数', key: 'uploadCount', editable: true },
        { title: '文件总大小', key: 'fileSize', sortable: true },
        { title: '权限申请次数', key: 'applyCertCount', sortable: true },
        { title: '行为评分', key: 'score', sortable: true }
      ],
      tableData: [],
      dataTest: [],
      tableDta: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleAgree (params) {
      console.log(222)
      console.log(params.row.userName)
      agree(params.row.userName).then(res => {
        if (res.data === 1) {
          this.$Message.success('审批通过')
        } else {
          this.$Message.error('操作失败')
        }
      }
      )
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getUserBehavior().then(res => {
      console.log(res.data.tableData)
      this.dataTest = res.data.tableData
      // Object.entries(res.data.tableData).forEach(item => this.tableDta.push(item))
      res.data.tableData.forEach(item => this.tableDta.push(item))
      // JSON.parse(res.data.tableData).forEach(item => this.tableDta.push(item))
      // this.dataTest.forEach(item => this.tableDta.push(item))
      this.tableData = this.tableDta
    })
  }
}
</script>

<style>

</style>
