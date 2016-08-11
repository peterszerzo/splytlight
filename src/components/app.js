import h from 'virtual-dom/h';

import Units from './units';

export default function App() {
  return (
    h('div', {className: 'app'}, Units({x: 300, y: 300}))
  );
}
