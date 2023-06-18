import { $Fetch } from 'ohmyfetch'

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  /**
   * method - GET, POST, PUT
   * URL
   **/
  async post<T>(url: string, data?: object, extras = {}): Promise<T> {
    const $res: T = await this.$fetch(url, {
      method: 'POST',
      body: data,
      ...extras
    })
    return $res
  }

  async get<T>(url: string, query = {}) {
    return (await this.$fetch(url, {
      method: 'GET',
      query
    })) as T
  }
}

export default HttpFactory
