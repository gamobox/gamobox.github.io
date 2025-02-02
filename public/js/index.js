;(() => {
  const darkmode = window.matchMedia('(prefers-color-scheme: dark)')

  function loadWidgets() {
    const embed = document.querySelectorAll('blockquote.twitter-tweet')
    if (embed.length === 0) {
      return
    }
    for (let i = 0; i < embed.length; i++) {
      if (darkmode.matches) {
        embed[i].setAttribute('data-theme', 'dark')
      } else {
        embed[i].setAttribute('data-theme', 'light')
      }
    }
    const script = document.createElement('script')
    script.src = '//platform.twitter.com/widgets.js'
    document.body.appendChild(script)
  }

  function changeTheme() {
    const iframe = document.querySelectorAll('div.twitter-tweet-rendered iframe')
    if (iframe.length === 0) {
      return
    }
    for (let i = 0; i < iframe.length; i++) {
      if (darkmode.matches) {
        iframe[i].src = iframe[i].src.replace('&theme=light&', '&theme=dark&')
      } else {
        iframe[i].src = iframe[i].src.replace('&theme=dark&', '&theme=light&')
      }
    }
  }

  window.addEventListener('DOMContentLoaded', loadWidgets)
  darkmode.addEventListener('change', changeTheme)
})()
