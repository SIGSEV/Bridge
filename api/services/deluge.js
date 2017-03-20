import got from 'got'

const r = (host, body, headers = {}) => got.post(`${host}/json`, { body, headers, json: true })

const payload = (method, params) =>
  JSON.stringify({ method, params, id: new Date().getTime() })

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
  []
]

export const fetch = (host, pass) =>
  r(host, payload('auth.login', [pass]))
    .then(response => {
      if (!response.body.result) { throw new Error('Unauthorized.') }

      const cookie = response.headers['set-cookie']
      return r(host, payload('web.update_ui', fields), { cookie })
    })
    .then(response => response.body.result)
