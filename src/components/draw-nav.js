import React from 'react'
import {StyleSheet, css} from 'aphrodite'
import IconButton from './icon-button'

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '40px'
  }
})

export default ({ state, setState }) => (
  <div className={css(styles.root)}>
    <IconButton
      icon={state.currentSize + 'Splyt'}
      title={`Set Splyt unit size | current: ${state.currentSize}`}
      onClick={() => {
        setState({
          currentSize: state.currentSize === 'small' ? 'large' : 'small'
        })
      }}
    />
    <IconButton
      icon={'download'}
      title={'Download design'}
      href={`data:application/octet-stream;type=,${JSON.stringify(state.tree)}`}
    />
    <IconButton
      icon={'upload'}
      title={'Upload design'}
      uploadId={'uploadFile'}
      onUpload={fileContents => {
        const tree = JSON.parse(fileContents)
        setState({
          tree
        })
      }}
    />
  </div>
)
