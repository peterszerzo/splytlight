import h from 'virtual-dom/h';

import UnitsContainer from './units-container';

export default function App() {
  return (
    h('div', {className: 'app'}, UnitsContainer({x: 500, y: 500}))
  );
}
