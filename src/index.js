import domReady from 'domready';
import createElement from 'virtual-dom/create-element';

import './index.html';
import './app.css';
import App from './components/app';
import {getState} from './state';

domReady(() => {
  const container = document.getElementById('app');
  const tree = App({data: getState()});
  const node = createElement(tree);
  container.appendChild(node);
});
