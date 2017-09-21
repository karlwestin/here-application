export default function fetchJSON (url) {
  return fetch(url, {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json()
      }

      return resp.json().then(Promise.reject.bind(Promise))
    })
}
