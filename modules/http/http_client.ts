import { catcherAsync } from '../../modules/errors/catcher.ts';

export class HttpClient {
  constructor(private readonly baseUrl: string, private readonly requestInit: RequestInit & { client?: Deno.HttpClient } = {}) {
  }

  get(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'GET', requestInit);
  }

  post(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'POST', requestInit);
  }

  put(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'PUT', requestInit);
  }

  patch(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'PATCH', requestInit);
  }

  delete(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'DELETE', requestInit);
  }

  options(url: string, requestInit: RequestInit = {}) {
    return this.request(url, 'OPTIONS', requestInit);
  }

  private request(url: string, method: string, requestInit: RequestInit = {}) {
    return catcherAsync(() =>
      fetch(this.baseUrl + url, {
        ...this.requestInit,
        ...requestInit,
        method,
        headers: {
          ...this.requestInit.headers,
          ...requestInit?.headers,
        },
      })
    );
  }
}
