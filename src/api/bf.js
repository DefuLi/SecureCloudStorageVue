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
    headers: {
      'Content-Type': 'false'
    }
  })
}
