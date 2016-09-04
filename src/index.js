import 'babel-polyfill';
import domReady from 'domready';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';

import startThreeApp from './three-app';

import './index.html';
import './app.css';
import App from './components/app';
import {
  getState,
  setState,
  subscribe
} from './state';

function setWindowDimensions() {
  const {innerWidth, innerHeight} = global.window;
  setState({
    ui: {
      windowWidth: innerWidth,
      windowHeight: innerHeight
    }
  });
}

domReady(() => {
  setWindowDimensions();
  window.addEventListener('resize', setWindowDimensions);
  const state = getState();
  const container = document.getElementById('app');
  let tree = App(state, {setState});
  let node = createElement(tree);
  container.appendChild(node);
  startThreeApp(state);
  function reRender(state) {
    let newTree = App(state, {setState});
    const patches = diff(tree, newTree);
    node = patch(node, patches);
    tree = newTree;
  }
  subscribe(reRender);
});
