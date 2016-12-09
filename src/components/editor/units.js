import {createElement} from 'react'
const {g} = require('hyperscript-helpers/dist/svg')(createElement)

import {splyt} from '../../constants/geometries'
import {getEndPoints} from '../../utilities/splyt'
import Unit from './unit'

const {PI} = Math

export default function Units ({state, setState}) {
  if (!state) {
    return
  }
  const {leftArm, rightArm} = splyt[state.size]
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(splyt[state.size])
  return (
    g({
      opacity: (['added', 'removing'].indexOf(state.status) > -1) ? 1 : 0.5
    },
      g({
        transform: `translate(${xl} ${yl}) rotate(${-leftArm.angle * 180 / PI})`
      },
        Units({
          state: state.left,
          setState (ch) {
            setState({left: Object.assign({}, state.left, ch)})
          }
        })
      ),
      g({
        transform: `translate(${xr} ${yr}) rotate(${-rightArm.angle * 180 / PI})`
      },
        Units({
          state: state.right,
          setState (ch) {
            setState({right: Object.assign({}, state.right, ch)})
          }
        })
      ),
      Unit({
        state,
        onControlClick (dir) {
          setState({
            [dir]: {
              status:
                (state[dir] && ('added', 'removing').indexOf(state[dir].status) > -1) ? 'adding' : 'removing',
              size: 'small'
            }
          })
        },
        onControlMouseEnter (dir) {
          if (!state[dir]) {
            return setState({
              [dir]: {
                id: '1',
                status: 'adding',
                size: 'small'
              }
            })
          }
          if (['adding', 'removing'].indexOf(state[dir].status) === -1) {
            setState({
              [dir]: Object.assign({}, state[dir], {status: 'removing'})
            })
          }
        },
        onControlMouseLeave (dir) {
          if (!state[dir]) {
            return
          }
          if (state[dir].status === 'adding') {
            return setState({
              [dir]: null
            })
          }
          if (state[dir].status === 'removing') {
            setState({
              [dir]: Object.assign({}, state[dir], {status: 'added'})
            })
          }
        }
      })
    )
  )
}
