import React from 'react'
import { css } from 'glamor'
import { title } from '../content'
import Icon from './icon'
import * as vars from '../constants/styling'

const containerClass = css({
  boxSizing: 'border-box',
  width: '100%',
  height: vars.headerHeight + 'px',
  background: vars.blue,
  padding: `0 ${vars.standardPadding}px`,
  position: 'fixed',
  display: 'flex',
  top: '0',
  left: '0'
})

const textClass = css({
  paddingLeft: '8px',
  textAlign: 'left',
  width: '100%',
  margin: 'auto',
  color: vars.white,
  fontWeight: '300',
  fontSize: '1.25rem',
  letterSpacing: '.03rem'
})

const logoContainerClass = css({
  width: (vars.headerHeight - 2 * 15) + 'px',
  height: vars.headerHeight + 'px',
  padding: '15 0'
})

const logoClass = css({
  width: '100%',
  height: '100%',
  fill: vars.white
})

export default () => (
  <header className={containerClass}>
    <div className={logoContainerClass}>
      <Icon
        className={logoClass}
        id={'logo'}
        style={{
          fill: vars.white
        }}
      />
    </div>
    <h1 className={textClass}>{title}</h1>
  </header>
)
