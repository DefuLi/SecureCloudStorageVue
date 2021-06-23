<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="unread" @on-select="handleSelect">
          <MenuItem name="unread">
            <span class="category-title">未读消息</span><Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
          </MenuItem>
          <MenuItem name="readed">
            <span class="category-title">已读消息</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageReadedCount"></Badge>
          </MenuItem>
          <MenuItem name="trash">
            <span class="category-title">回收站</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageTrashCount"></Badge>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-list-con">
        <Spin fix v-if="listLoading" size="large"></Spin>
        <Menu
          width="auto"
          active-name=""
          :class="titleClass"
          @on-select="handleView"
        >
          <MenuItem v-for="item in messageList" :name="item.msg_id" :key="`msg_${item.msg_id}`">
            <div>
              <p class="msg-title">{{ item.title }}</p>
              <Badge status="default" :text="item.createTime" />
              <Button
                style="float: right;margin-right: 20px;"
                :style="{ display: item.loading ? 'inline-block !important' : '' }"
                :loading="item.loading"
                size="small"
                :icon="currentMessageType === 'readed' ? 'md-trash' : 'md-redo'"
                :title="currentMessageType === 'readed' ? '删除' : '还原'"
                type="text"
                v-show="currentMessageType !== 'unread'"
                @click.native.stop="removeMsg(item)"></Button>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <Spin fix v-if="contentLoading" size="large"></Spin>
        <div class="message-view-header">
          <h2 class="message-view-title">{{ showingMsgItem.title }}</h2>
          <time class="message-view-time">{{ showingMsgItem.createTime }}</time>
        </div>
        <!-- <div v-html="messageContent"></div> -->
        <div v-show="buttonShow">
          尊敬的{{ this.token }}，您好：
        </div>
        <div v-show="buttonShow">
         {{ showingMsgItem.authorizedUser }}向您申请文件的证书{{ readWrite }}权限，如果您同意向其授权，请点击下方的去授权按钮，对用户进行授权操作。
        </div>
        <div style="margin-top:20px;" v-show="buttonShow">
        <td v-show="certShow">
        <Button icon="ios-cloud-upload-outline" @click="goToGenerateCert()">去授权</Button>
        </td>
        <td class="td-space" v-show="certShow"></td>
        <td>
        <Button icon="ios-cloud-upload-outline" @click="goBack()">返回</Button>
        </td>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getToken } from '@/libs/util'
const listDic = {
  unread: 'messageUnreadList',
  readed: 'messageReadedList',
  trash: 'messageTrashList'
}
export default {
  name: 'message_page',
  data () {
    return {
      readWrite: null,
      token: getToken(),
      listLoading: true,
      contentLoading: false,
      certShow: false,
      buttonShow: false,
      currentMessageType: 'unread',
      messageContent: '',
      showingMsgItem: {}
    }
  },
  computed: {
    ...mapState({
      messageUnreadList: state => state.user.messageUnreadList,
      messageReadedList: state => state.user.messageReadedList,
      messageTrashList: state => state.user.messageTrashList,
      messageList () {
        return this[listDic[this.currentMessageType]]
      },
      titleClass () {
        return {
          'not-unread-list': this.currentMessageType !== 'unread'
        }
      }
    }),
    ...mapGetters([
      'messageUnreadCount',
      'messageReadedCount',
      'messageTrashCount'
    ])
  },
  methods: {
    ...mapMutations([
      //
    ]),
    ...mapActions([
      'getContentByMsgId',
      'getMessageList',
      'hasRead',
      'removeReaded',
      'restoreTrash'
    ]),
    stopLoading (name) {
      this[name] = false
    },
    goToGenerateCert () {
      this.$router.push({
        name: '证书授权',
        params: { input: this.showingMsgItem.authorizedUser, radio: this.showingMsgItem.readWrite }
      })
    },
    goBack () {
      this.messageContent = null
      this.showingMsgItem = {}
      this.buttonShow = false
      this.certShow = false
    },
    handleSelect (name) {
      this.currentMessageType = name
    },
    handleView (msg_id) {
      this.contentLoading = true
      this.getContentByMsgId({ msg_id }).then(content => {
        this.messageContent = content
        console.log(content)
        const item = this.messageList.find(item => item.msg_id === msg_id)
        if (item) this.showingMsgItem = item
        if (this.currentMessageType === 'unread') this.hasRead({ msg_id })
        if (this.showingMsgItem.readWrite === 2) {
          this.readWrite = '读写'
        } else {
          this.readWrite = '写'
        }
        this.stopLoading('contentLoading')
        this.buttonShow = true
        if (this.showingMsgItem.title === '证书授权申请') this.certShow = true
      }).catch(() => {
        this.stopLoading('contentLoading')
      })
    },
    removeMsg (item) {
      item.loading = true
      const msg_id = item.msg_id
      if (this.currentMessageType === 'readed') this.removeReaded({ msg_id })
      else this.restoreTrash({ msg_id })
    }
  },
  mounted () {
    this.listLoading = true
    // 请求获取消息列表
    // console.log(this.token)
    this.getMessageList().then(() => this.stopLoading('listLoading')).catch(() => this.stopLoading('listLoading'))
  }
}
</script>

<style lang="less">
.td-space{
  width: 20%;
}
.message-page{
  &-con{
    height: ~"calc(100vh - 176px)";
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con{
      border-right: 1px solid #e6e6e6;
      width: 200px;
    }
    &.message-list-con{
      border-right: 1px solid #e6e6e6;
      width: 230px;
    }
    &.message-view-con{
      position: absolute;
      left: 446px;
      top: 16px;
      right: 16px;
      bottom: 16px;
      overflow: auto;
      padding: 12px 20px 0;
      .message-view-header{
        margin-bottom: 20px;
        .message-view-title{
          display: inline-block;
        }
        .message-view-time{
          margin-left: 20px;
        }
      }
    }
    .category-title{
      display: inline-block;
      width: 65px;
    }
    .gray-dadge{
      background: gainsboro;
    }
    .not-unread-list{
      .msg-title{
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item{
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
          display: none;
        }
        &:hover{
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
