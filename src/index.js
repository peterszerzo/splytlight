// @flow
import { render } from 'react-dom'
import Root from './components/root'
import { get, set, subscribe } from './state'
import { Observable } from 'rxjs'

const resizeStream = Observable.fromEvent(window, 'resize').map(e => ({
  windowWidth: e.target.innerWidth,
  windowHeight: e.target.innerHeight
})).throttle(ev => Observable.interval(50)).startWith({
  windowWidth: global.window.innerWidth,
  windowHeight: global.window.innerHeight
})

resizeStream.subscribe(dim => {
  set({
    ui: dim
  })
})

const container = document.getElementById('app')
render(Root({state: get(), setState: set}), container)
subscribe(state => {
  render(Root({state, setState: set}), container)
})
