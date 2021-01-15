import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',

    // 新接口
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout: 3000
  })

  //配置请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
    return err
  })

  // 配置响应拦截器
  instance.interceptors.response.use(result => {
    return result.data
  }, err => {
    console.log(err)
    return err
  })

  return instance(config)
}
