import * as Config from '@/config'
import axios from 'axios'

/**
 * 封装post请求
 * @param path
 * @param data
 * @param success
 * @param error
 * @param final
 */
export const post = function (path, data, success, error, final) {
    let result = axios
        .post(path, data, Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装get请求
 * @param path
 * @param success
 * @param error
 * @param final
 */
export const get = function (path, success, error, final) {
    let result = axios
        .get(path, Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装patch请求
 * @param path
 * @param success
 * @param error
 * @param final
 */
export const patch = function(path,data, success, error, final){
    let result=axios
        .patch(path,Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
            })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}

/**
 * 封装delete请求
 * @param path
 * @param success
 * @param error
 * @param final
 */
export const del = function(path,success,error,final){
    let result=axios
        .delete(path,Config.config)
        .then(res => {
            if (res.status.toString().startsWith('2')) {
                success(res.data)
            } else {
                error(res?.statusText)
                throw res?.statusText
            }
        })
        .catch(err => {
            error(err?.message)
            throw err?.message
        })
        .finally(() => {
            if (typeof final === 'function') final()
        })

    return result
}