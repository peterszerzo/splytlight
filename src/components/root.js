import React from 'react'
import { css } from 'glamor'
import * as vars from '../constants/styling'
import DrawNav from './draw-nav'
import Overlay from './overlay'
import Nav from './nav'
import { about } from '../content'
import Header from './header'
import TwoDee from './2d'
import ThreeDee from './3d'

const rootClass = css({
  position: 'relative'
})

const mainClass = css({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  height: `calc(100% - ${vars.headerHeight}px)`,
  bottom: '0',
  left: '0'
})

const vizClass = css({
  position: 'relative',
  width: '50%',
  height: '100%',
  flex: '1',
  ':first-of-type': {
    borderRight: `1px solid ${vars.faintBlue}`
  }
})

export default ({state, setState, changeTree}) => (
  <div className={rootClass}>
    <Header />
    <Overlay
      isActive={state.route === '/about'}
      content={about}
    />
    <Nav state={state} setState={setState} />
    <div className={mainClass}>
      <div className={vizClass}>
        <TwoDee
          className={vizClass}
          state={state}
          changeTree={changeTree}
        />
      </div>
      <ThreeDee state={state} setState={setState} />
      <DrawNav state={state} setState={setState} />
    </div>
  </div>
)
