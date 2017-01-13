import 'babel-polyfill'
import domReady from 'domready'
import { render } from 'react-dom'
import App from './components/app'
import { get, set, subscribe } from './state'

function setWindowDimensions () {
  set({
    ui: {
      windowWidth: global.window.innerWidth,
      windowHeight: global.window.innerHeight
    }
  })
}

domReady(() => {
  setWindowDimensions()
  window.addEventListener('resize', setWindowDimensions)
  const state = get()
  const container = document.getElementById('app')
  render(App({state, setState: set}), container)
  subscribe(state => {
    render(App({state, setState: set}), container)
  })
})
