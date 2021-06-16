import axios from '@/libs/api.request'

export const propertyEncrypt = ({ arrselect, file }) => {
  const data = {
    arrselect,
    file
  }
  return axios.request({
    url: 'excel/propertyEncrypt',
    params: data,
    method: 'get'
  })
}

export const EncryptExcel = formData => {
  return axios.request({
    url: 'excel/propertyEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

export const UploadExcel = () => {
  return axios.request({
    url: '/excel/upload',
    method: 'post'
  })
}

export const DecryptExcel = formData => {
  return axios.request({
    url: 'excel/propertyDecrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
// export const propertyEncrypt = (arrSelect) => {
//   return axios.request({
//     url: 'excel/propertyEncrypt',
//     params: arrSelect,
//     method: 'post'
//   })
// }

// export const propertyDecrypt = (arrSelect) => {
//   return axios.request({
//     url: 'excel/propertyDecrypt',
//     params: arrSelect,
//     method: 'post'
//   })
// }

export const propertyDecrypttest = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'excel/propertyDecrypt',
    params: data,
    method: 'post'
  })
}

// 密文运算模块
// 读取文件
export const ExcelOperationUpload = () => {
  return axios.request({
    url: '/excelOperation/upload',
    method: 'post'
  })
}

// 保序关键字加密
export const OpeKeyEncrypt = formData => {
  return axios.request({
    url: 'excelOperation/opeKeyEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

// 保序范围加密
export const OpePropertyEncrypt = formData => {
  return axios.request({
    url: 'excelOperation/opePropertyEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

// 关系运算
export const RelationComputation = formData => {
  return axios.request({
    url: 'excelOperation/relationComputation',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

// 算术关键字加密
export const ArithKeyEncrypt = formData => {
  return axios.request({
    url: 'excelOperation/arithKeyEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

// 算术运算
export const ArithEncrypt = formData => {
  return axios.request({
    url: 'excelOperation/arithEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
