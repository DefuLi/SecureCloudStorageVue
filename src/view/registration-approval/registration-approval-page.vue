<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-agree="handleAgree"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getRegisters, agree } from '@/api/data'
export default {
  name: 'registration_approval',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '用户名', key: 'userName', sortable: true },
        { title: '审批状态', key: 'status', editable: true },
        { title: '申请日期', key: 'createTime', sortable: true },
        {
          title: '操作',
          key: 'handle',
          options: ['agree']['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要同意用户注册吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-agree', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '同意')
              ])
            }
            // (h, params, vm) => {
            //   return h('Poptip', {
            //     props: {
            //       confirm: true,
            //       title: '你确定要删除吗?'
            //     },
            //     on: {
            //       'on-ok': () => {
            //         vm.$emit('on-delete', params)
            //         vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
            //       }
            //     }
            //   }, [
            //     h('Button', '自定义删除')
            //   ])
            // }
          ]
        }
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
      console.log(params.row.id)
      agree(params.row.id).then(res => {
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
    getRegisters().then(res => {
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
