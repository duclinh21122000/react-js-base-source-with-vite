import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'

const instance: AxiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  async (config: any) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   const accessToken = JSON.parse(token)?.accessToken;
    //   if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    // }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    const { data } = response
    const errorType = data?.errorType
    if (errorType || response.status < 200 || response.status >= 300) {
      if (errorType === 'ACCESS_TOKEN_EXPIRED' || errorType === 'UNAUTHORIZED') {
        // store.dispatch(logout());
      }
      return Promise.reject(data)
    }

    return Promise.resolve(data)
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const get = async (url: string, params: any = {}): Promise<any> => {
  return await instance.get(url, { params })
}

export const post = async (url: string, data?: object | File, param?: any): Promise<any> => {
  let payload
  if (data instanceof File) {
    const formData = new FormData()
    formData.append('file', data)
    payload = formData
    return await instance.post(url, payload, {
      params: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } else {
    if (!isEmpty(data)) {
      payload = data
    }
  }

  return await instance.post(url, payload)
}

export const patch = async (url: string, data?: object | File, param?: any): Promise<any> => {
  let payload
  if (data instanceof File) {
    const formData = new FormData()
    formData.append('file', data)
    payload = formData
    return await instance.patch(url, payload, {
      params: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } else {
    if (!isEmpty(data)) {
      payload = data
    }
  }

  return await instance.patch(url, payload)
}

export const put = async (url: string, data?: object | File, param?: any): Promise<any> => {
  let payload
  if (data instanceof File) {
    const formData = new FormData()
    formData.append('file', data)
    payload = formData
    return await instance.put(url, payload, {
      params: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } else {
    if (!isEmpty(data)) {
      payload = data
    }
  }

  return await instance.put(url, payload)
}

export const deleteMethod = async (url: string, data: any = {}): Promise<any> => {
  return await instance.delete(url, { data })
}
