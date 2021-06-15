import axios from '@/libs/api.request'

export const creatCert = ({ username, myname, accesstype }) => {
  const data = {
    username,
    myname,
    accesstype
  }
  return axios.request({
    url: 'cert/add',
    params: data,
    method: 'post'
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
