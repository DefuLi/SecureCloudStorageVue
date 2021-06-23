import axios from '@/libs/api.request'

export const creatCert = ({ authorizeduser, authoruser, accesstype }) => {
  const data = {
    authorizeduser,
    authoruser,
    accesstype
  }
  return axios.request({
    url: 'cert/add',
    params: data,
    method: 'post'
  })
}

export const newCreatCert = formData => {
  return axios.request({
    url: 'cert/add',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}

export const getCertList = (authoruser) => {
  const data = {
    authoruser
  }
  return axios.request({
    url: 'cert/getlist',
    params: data,
    method: 'get'
  })
}

export const deleteCert = formData => {
  return axios.request({
    url: 'cert/delete',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'false'
    }
  })
}
