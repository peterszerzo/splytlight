import h from 'react-hyperscript';
import classNames from 'classnames';

import {countUnits, countLooseEnds} from '../utilities/splyt';

export default ({isDashboardExpanded, tree}, {setState}) => (
  h('div', {
    className: classNames('dashboard', {
      'dashboard--expanded': isDashboardExpanded
    })
  }, [
    isDashboardExpanded
      ?
      (
        h('div', [
          h('p', {}, `Units: ${countUnits(tree)}`),
          h('p', {}, `Bulbs: ${countLooseEnds(tree)}`)
        ])
      )
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
