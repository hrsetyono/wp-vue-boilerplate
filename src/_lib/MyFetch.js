/**
 * Simple GET and POST functions that return Promise.
 *
 * Reference:
 *   axios-lite https://github.com/piyas1234/react-server-request
 *
 * Example:
 *   const myFetch = new MyFetch('https://mysite.com/wp-json/my/v1');
 *   myFetch.get('/posts');
 *   myFetch.post('/create-post', {...});
 */
class MyFetch {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL || '';
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  /**
   * @param string path - path to append to the base URL
   */
  async get(path) {
    try {
      const response = await fetch(this.baseURL + path, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        return Promise.reject(await response.json());
      }

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Get data from sessionStorage, if not found then do API request and save it to sessionStorage
   */
  async getFromSession(path) {
    const cached = sessionStorage.getItem(path);
    if (cached) {
      return JSON.parse(cached);
    }

    const data = await this.get(path);
    sessionStorage.setItem(path, JSON.stringify(data));
    return data;
  }

  /**
   * Get data from localStorage, if not found then do API request and save it to localStorage
   */
  async getFromLocal(path) {
    const cached = localStorage.getItem(path);
    if (cached) {
      return JSON.parse(cached);
    }

    const data = await this.get(path);
    localStorage.setItem(path, JSON.stringify(data));
    return data;
  }

  async post(apiPath, body) {
    let bodyData = null;
    if (body instanceof Element) {
      bodyData = new FormData(body);
    } else {
      bodyData = JSON.stringify(body);
    }

    try {
      const response = await fetch(this.baseURL + apiPath, {
        method: 'POST',
        body: bodyData,
        headers: this.headers,
      });

      if (!response.ok) {
        return Promise.reject(await response.json());
      }

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async delete(apiPath) {
    try {
      const response = await fetch(this.url + apiPath, {
        method: 'DELETE',
      });

      return await response;
    } catch (err) {
      console.log(err);
    }
  }
}

// Setup authorization token if any
const headers = {};
const token = localStorage.getItem('userToken');
if (token) {
  headers.Authorization = `Bearer ${token}`;
}

const myFetch = new MyFetch(import.meta.env.VITE_CUSTOM_API, headers);
const wpFetch = new MyFetch(import.meta.env.VITE_WP_API, headers);
const authFetch = new MyFetch(import.meta.env.VITE_AUTH_API, headers);

export default MyFetch;
export {
  myFetch,
  wpFetch,
  authFetch,
};
