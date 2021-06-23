import axios from '@/libs/api.request'

export const EncryptBF = formData => {
  return axios.request({
    url: 'BF/BFEncrypt',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
