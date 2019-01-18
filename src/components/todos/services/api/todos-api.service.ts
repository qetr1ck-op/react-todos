enum HttpMethods {
  Get = 'GET',
  Post = 'Post'
}

export class TodosApiService {
  private readonly rootURI =
    'https://www.jsonstore.io/e0aad47cfd316be19c71b232482333d64597bb9b8f74f0511d85104dbb326937/todos/'

  async getSingle(id: string) {
    const response = await fetch(`${this.rootURI}${id}`, {method: HttpMethods.Get})

    return response.json()
  }

  async getAll() {
    const response = await fetch(this.rootURI, {method: HttpMethods.Get})

    return response.json()
  }
}
