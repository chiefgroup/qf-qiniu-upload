export function openLink(url) {
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}