import domReady from 'domready';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import 'babel-polyfill';

import startThreeApp from './three-app';

import './index.html';
import './app.css';
import App from './components/app';
import {
  getState,
  setState,
  subscribe
} from './state';

domReady(() => {
  const container = document.getElementById('app');
  let x : number = 0;
  let y : number = 0;
  setDimensions();
  let tree = App({state: getState(), x, y}, {setState});
  let node = createElement(tree);
  container.appendChild(node);

  startThreeApp();

  function reRender(state) {
    let newTree = App({state, x, y}, {setState});
    const patches = diff(tree, newTree);
    node = patch(node, patches);
    tree = newTree;
  }

  function setDimensions() {
    x = window.innerWidth / 2;
    y = window.innerHeight - 80;
  }

  subscribe(reRender);
  window.addEventListener('resize', () => {
    setDimensions();
    reRender(getState());
  });
});
