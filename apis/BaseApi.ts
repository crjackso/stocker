class BaseApi {
  async post<T>(url: string, data?: object, extras = {}): Promise<T> {
    const $res: T = await $fetch(url, {
      method: 'POST',
      body: data,
      ...extras
    })
    return $res
  }

  async get<T>(url: string, query = {}) {
    return (await $fetch(url, {
      method: 'GET',
      query
    })) as T
  }
}

export default BaseApi
