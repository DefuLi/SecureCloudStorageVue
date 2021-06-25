import { Message } from 'element-ui'

/**
 * 防抖函数
 * @param {*} func 防抖后要执行的回调
 * @param {*} wait 等待时间
 * @param {*} immediate
 */
function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 将数组转化成树结构 array to tree
 * @param {*} array 数据源
 * @param {*} options 字段名配置项
 */
function arrayToTree (
  array = [],
  options = { id: 'id', pid: 'pid', children: 'children' }
) {
  let array_ = [] // 创建储存剔除叶子节点后的骨架节点数组
  let unique = {} // 创建盒子辅助本轮children合并去重
  let root_pid = [
    0,
    '0',
    undefined,
    'undefined',
    null,
    'null',
    '00000000-0000-0000-0000-000000000000'
  ] // 可能存在的根节点pid形式
  array.forEach(item => {
    // 筛选可以插入当前节点的所有子节点
    let children_array = array.filter(
      it => it[options.pid] === item[options.id]
    )
    if (item[options.children] && item[options.children] instanceof Array && item[options.children].length > 0) {
      // 去重合并数组
      item[options.children].map(i => (unique[i[options.id]] = 1))
      item[options.children].push(
        ...children_array.filter(i => unique[i[options.id]] !== 1)
      )
    } else {
      item[options.children] = children_array
    }
    // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组
    let has_children = children_array.length > 0
    if (
      has_children ||
                (!has_children && root_pid.includes(item[options.pid]))
    ) {
      array_.push(item)
    }
  })
  // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次
  if (!array_.every(item => root_pid.includes(item[options.pid]))) {
    return arrayToTree(array_, options)
  } else {
    return array_
  }
}

/**
 * 从坐标值拼接指定字段到祖先元素
 * @param {*} data 一维数据源
 * @param {*} coordinate 坐标值数据
 * @param {*} options 配置项
 */
function splicParentsUntil (data, coordinate, options = {
  pathName: 'name', // 所要拼接字段
  pathConnector: '\\', // 连接符
  pathId: 'id', // 数据源匹配字段
  pathParents: 'parents',
  pathIdentityId: 'identityId'
}) {
  let coordinate_item = data.find(i => i[options.pathId] === coordinate[options.pathId])
  if (!coordinate_item) return ''
  if (!coordinate_item[options.pathParents]) return coordinate_item[options.pathName]
  let _parents = coordinate_item[options.pathParents]
    .substring(1, coordinate_item[options.pathParents].length - 1)
    .split(',')
    .filter(i => !!i)
  let splic_parents = ''
  _parents.forEach(i => {
    let _parent = data.find(t => t[options.pathIdentityId] === i)
    splic_parents += `${_parent[options.pathName]}${options.pathConnector}`
  })
  return splic_parents + coordinate_item[options.pathName]
}

/**
 * 处理下载接口返回的文件流数据
 * @param {*} res http请求返回数据
 */
function download (res, name) {
  const typeDic = {
    docx: 'application/msword',
    doc: 'application/msword',
    bin: 'application/octet-stream',
    exe: 'application/octet-stream',
    so: 'application/octet-stream',
    dll: 'application/octet-stream',
    pdf: 'application/pdf',
    ai: 'application/postscript',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    dir: 'application/x-director',
    js: 'application/x-javascript',
    swf: 'application/x-shockwave-flash',
    xhtml: 'application/xhtml+xml',
    xht: 'application/xhtml+xml',
    zip: 'application/zip',
    mid: 'audio/midi',
    midi: 'audio/midi',
    mp3: 'audio/mpeg',
    rm: 'audio/x-pn-realaudio',
    rpm: 'audio/x-pn-realaudio-plugin',
    wav: 'audio/x-wav',
    bmp: 'image/bmp',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    css: 'text/css',
    html: 'text/html',
    htm: 'text/html',
    txt: 'text/plain',
    xsl: 'text/xml',
    xml: 'text/xml',
    mpeg: 'video/mpeg',
    mpg: 'video/mpeg',
    avi: 'video/x-msvideo',
    movie: 'video/x-sgi-movie'
  }

  console.log('download res')
  console.log(res)
  // 错误处理
  if (res.data.type === 'application/json') {
    let reader = new FileReader()
    reader.readAsText(res.data, 'utf-8')
    reader.onload = function () {
      let json_data = JSON.parse(reader.result)
      Message({
        showClose: true,
        message: json_data.Message,
        type: 'error'
      })
    }
    return
  }
  // 下载处理
  let filename = res.headers === 'content-disposition'
    ? decodeURIComponent(
      res.headers['content-disposition']
        .split(';')[1]
        .split('=')[1]
        .replace(/"/g, '')
    )
    : '下载文件'
  // let filename = res.headers
  try {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(res.data, filename)
    } else {
      // let blob = new Blob([res.data], {
      //         type: 'application/vnd.ms-excel'
      //     })
      // const fileNameGroup = filename
      console.log(name)
      const fileNameGroup = name.split('.')
      const fileType = fileNameGroup[fileNameGroup.length - 1].toLowerCase()
      console.log(fileType)
      let blob = new Blob([res.data], { type: typeDic[fileType] })
      let url = URL.createObjectURL(blob)
      let link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url) // 释放URL 对象
      document.body.removeChild(link)
    }
  } catch (err) {
    // console.log(err)
  }
}

/**
 * 关闭其他弹出类视图函数
 * 用于切换侧滑区域内容
 * data:object 要求为该页面layout字段
 * key:string 需要打开的视图
 */
function closeOtherLayout (data = {}, key) {
  for (let item in data) {
    data[item] = false
  }
  if (key) data[key] = true
}

export {
  debounce, // 防抖函数
  arrayToTree, // 将数组转化成树结构
  splicParentsUntil, // 从坐标值拼接指定字段到祖先元素
  download, // download
  closeOtherLayout // 关闭其他弹出类视图函数
}
