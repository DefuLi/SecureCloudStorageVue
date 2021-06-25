import axios from '@/libs/api.request'

export const EncryptBF = formData => {
  return axios.request({
    url: 'bf/bfencrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

export const DecryptBF = formData => {
  return axios.request({
    url: 'bf/bfdecrypt',
    data: formData,
    method: 'post',
    responseType: 'blob',
    headers: {
      // 'Content-Type': 'false'
    }
  })
}

export const Encryptbfupload = formData => {
  return axios.request({
    url: 'bf/bfupload',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
export const Encryptbfdownload = formData => {
  return axios.request({
    url: 'bf//bfdownload',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
