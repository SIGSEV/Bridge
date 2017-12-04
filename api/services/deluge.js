import got from 'got'

const r = (host, body, headers = {}) =>
  got.post(`${host}/json`, {
    body,
    headers: { ...headers, 'Content-Type': 'application/json' },
    json: true,
  })

const payload = (method, params) => ({ method, params, id: Date.now() })

const fields = [
  [
    'name',
    'total_size',
    'state',
    'progress',
    'download_payload_rate',
    'upload_payload_rate',
    'eta',
    'ratio',
    'time_added',
    'total_done',
    'total_uploaded',
  ],
  [],
]

const query = (host, pass, method, args) =>
  r(host, payload('auth.login', [pass]))
    .then(response => {
      if (!response.body.result) {
        throw new Error('Unauthorized.')
      }

      const cookie = response.headers['set-cookie']
      return r(host, payload(method, args), { cookie })
    })
    .then(response => response.body.result)

export const fetch = (host, pass) => query(host, pass, 'web.update_ui', fields)

export const upload = (host, pass, file) => query(host, pass, 'webapi.add_torrent', [file])
