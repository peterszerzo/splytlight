import domReady from 'domready';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';

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
  let tree = App({data: getState()}, {setState});
  let node = createElement(tree);
  container.appendChild(node);
  subscribe((state) => {
    let newTree = App({data: state}, {setState});
    const patches = diff(tree, newTree);
    node = patch(node, patches);
    tree = newTree;
  });
});
