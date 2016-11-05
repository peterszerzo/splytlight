import 'babel-polyfill';
import React from 'react';
import domReady from 'domready';
import {render} from 'react-dom';

import startThreeApp from './three-app';

import './app.css';
import App from './components/app';
import {
  getState,
  setState,
  subscribe
} from './state';

global.React = React;

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
  render(App(state, {setState}), container);
  startThreeApp(state);
  subscribe(state => {
    render(App(state, {setState}), container);
  });
});
