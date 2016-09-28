import h from 'virtual-dom/h';
import classNames from 'classnames';
const {div, button, p} = require('hyperscript-helpers')(h);

import {countUnits, countLooseEnds} from '../utilities/splyt';

export default function Dashboard({isDashboardExpanded, tree}, {setState}) {
  return (
    div({
      className: classNames('dashboard', {
        'dashboard--expanded': isDashboardExpanded
      })
    }, [
      isDashboardExpanded
        ?
        (
          div([
            p(`Units: ${countUnits(tree)}`),
            p(`Bulbs: ${countLooseEnds(tree)}`)
          ])
        )
        :
        (
          button('.dashboard__open', {
            onclick: () => {
              setState({
                isDashboardExpanded: true
              });
            }
          }, '+')
        )

    ])
  );
}
