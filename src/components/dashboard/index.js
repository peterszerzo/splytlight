import h from 'react-hyperscript';
import classNames from 'classnames';

import './style.css';
import {countUnits, countLooseEnds} from '../../utilities/splyt';

function Summary(tree) {
  return (
    h('div', [
      h('p', {}, `Units: ${countUnits(tree)}`),
      h('p', {}, `Bulbs: ${countLooseEnds(tree)}`)
    ])
  );
}

export default ({isDashboardExpanded, tree}, {setState}) => (
  h('div', {
    className: classNames('dashboard', {
      'dashboard--expanded': isDashboardExpanded
    })
  }, [
    isDashboardExpanded
      ?
      Summary(tree)
      :
      (
        h('button.dashboard__open', {
          onClick: () => {
            setState({
              isDashboardExpanded: true
            });
          }
        }, '+')
      )
  ])
);
