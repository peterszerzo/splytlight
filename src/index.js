import domReady from 'domready';
import createElement from 'virtual-dom/create-element';

import './app.css';
import App from './components/app';

domReady(() => {
  const container = document.getElementById('app');
  const tree = App();
  const node = createElement(tree);
  container.appendChild(node);
});
