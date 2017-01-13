import 'babel-polyfill'
import domReady from 'domready'
import { render } from 'react-dom'
import Root from './components/root'
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
  render(Root({state, setState: set}), container)
  subscribe(state => {
    render(Root({state, setState: set}), container)
  })
})
