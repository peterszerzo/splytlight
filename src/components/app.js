import h from 'virtual-dom/h';

import UnitsContainer from './units-container';

export default function App({data}, {setState}) {
  return (
    h('div', {className: 'app'}, [
      h('h1', {className: 'app__title'}, 'SplytViz'),
      UnitsContainer({
        data: data,
        x: 500,
        y: 500
      }, {setState})
    ])
  );
}
