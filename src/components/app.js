import h from 'virtual-dom/h';

import UnitsContainer from './units-container';

export default function App({data}) {
  return (
    h('div', {className: 'app'}, UnitsContainer({
      data: data,
      x: 500,
      y: 500
    }))
  );
}
