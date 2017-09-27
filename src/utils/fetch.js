var cache = {}

export default function fetchJSON (url) {
  if (!cache[url]) {
    cache[url] = fetch(url, {
      mode: 'cors',
      method: 'GET'
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        }

        cache[url] = null
        return resp.json().then(Promise.reject.bind(Promise))
      })
  }

  return cache[url]
}

// this is used in unit testing
export function clear () { cache = {} }
