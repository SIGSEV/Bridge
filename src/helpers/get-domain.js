export default url => {
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}
