import http from '@/utils/http'

const baseURL = '/v1.0'

/**
 * 根据条件查找资源
 * - keyword: 关键词
 * - type: 资源类型
 * - perPage: 每页多少个
 * - page: 第几页
 * @param {Object} params
 * @param {String} params.keyword
 * @param {String} params.type
 * @param {String} params.perPage
 * @param {String} params.page
 * @returns {AxiosPromise}
 */
export const resource = (params) => {
  let data = ''
  for (const info in params) {
    data += info + '=' + params[info] + '&'
  }
  // console.log(data)
  return http.get(`${baseURL}/public/conditionalQueryResource?${data}`)
}

/**
 * 根据资源ID查找资源信息
 * - resourceID 资源ID
 * @param {String} resourceID
 */
export const resourceInfo = (resourceID) => {
  return http.get(`${baseURL}/public/queryResource?resourceID=${resourceID}`)
}

/**
 * 根据资源ID查找相关资源信息
 * - resourceID 资源ID
 * @param {String} resourceID
 */
export const related = (resourceID) => {
  return http.get(`${baseURL}/public/relatedResource?resourceID=${resourceID}`)
}

/**
 * 根据资源ID下载资源
 * - id 资源ID
 * @param {Number} resourceID
 */
export const download = (resourceID) => {
  // return http.download(`http://202.102.89.244:9000/e-resource/api${baseURL}/public/downloadnew?resourceID=${resourceID}`)
  return http.download(`http://127.0.0.1:9000/e-resource/api${baseURL}/public/downloadnew?resourceID=${resourceID}`)
}

/**
 * 根据资源 ID 获取评论
 * @param {Number} resourceID- 资源 ID
 * @returns {AxiosPromise}
 */
export const getComment = (resourceID) => {
  return http.get(`${baseURL}/public/comment?resourceID=${resourceID}`)
}

/**
 * 添加资源评论
 */
export const addComment = (params) => {
  return http.post(`${baseURL}/public/addComment`, params)
}
