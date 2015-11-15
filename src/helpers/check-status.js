export default function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(res.statusText)
  error.res = res
  throw error
}
