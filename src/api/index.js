import request from '@/util/request'
import axios from '@/libs/api.request'

// // 1获取文件夹列表
// function getFileListApi(data) {
//     return request({
//         url: '.././data/file-list.json',
//         // url: 'fileManager/getAllFileList',
//         data
//     })
// }

// 获取用户根目录下的文件
export const getFileListApi = (userName) => {
  const data = {
    userName
  }
  return axios.request({
    url: 'fileManager/getFileList',
    params: data,
    method: 'post'
  })
}

// 获取用户全部文件
export const getAllFoldersApi = (userName) => {
  const data = {
    userName
  }
  return axios.request({
    url: 'fileManager/getAllFoldersApi',
    params: data,
    method: 'post'
  })
}

// 根据文件名获取文件
export const getFilesByNameApi = (fileName, type, userName) => {
  const data = {
    fileName,
    type,
    userName
  }
  return axios.request({
    url: 'fileManager/getFilesByNameApi',
    params: data,
    method: 'post'
  })
}

export const downloadFile = (fileInfo) => {
  let formData = new FormData()
  const data = {
    fileInfo
  }
  return axios.request({
    url: 'fileManager/downloadFile',
    params: data,
    method: 'post',
    responseType: 'blob',
    data: formData
  })
}

export const uploadFileApi = (file) => {
  const data = {
    file
  }
  return axios.request({
    url: 'fileManager/uploadFileApi',
    params: data,
    method: 'post'
  })
}

// 2新增文件夹
function addFolderApi (data) {
  return request({
    url: '.././data/add-file.json',
    data
  })
}

// // 4获取全部文件夹
// function getAllFoldersApi(data) {
//     return request({
//         url: '.././data/file-list-all.json',
//         // url: '/fileManager/getAllFileList',
//         data
//     })
// }

// 6删除文件|文件夹
function delFileApi (data) {
  return request({
    url: '.././data/del-file.json',
    data
  })
}

// 8下载数据
function downloadDataApi (data) {
  return request({
    url: '.././data/download.text',
    responseType: 'blob',
    data
  })
}

// 9文件夹移动
function fileMoveApi (data) {
  return request({
    url: '.././data/move-file.json',
    data
  })
}

export {
  // getFileListApi, // 1获取文件夹列表
  addFolderApi, // 2新增文件夹
  // getAllFoldersApi, // 4获取全部文件夹
  delFileApi, // 6删除文件|文件夹
  downloadDataApi, // 8下载数据
  fileMoveApi // 9文件夹移动
  // getFilesByNameApi
}
