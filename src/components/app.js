import h from 'virtual-dom/h';

import UnitsContainer from './units-container';

export default function App({data}, {setState}) {
  return (
    h('div', {className: 'app'}, [
      h('div', {className: 'app__main'}, [
        h('div', {className: 'app__viz'}, [
          UnitsContainer({
            data: data,
            x: 500,
            y: 500
          }, {setState})
        ]),
        h('div', {className: 'app__viz'}, [])
      ]),
      h('div', {className: 'app__nav'}, [
        h('h1', {}, 'Your very own Splyt Light')
      ])
    ])
  );
}
