import React from "react"
import glamorous from "glamorous"
import getContainerDimensions from "../../styles/layout"
import Units from "./units"

const Container = glamorous.div({
  margin: "auto",
  "& circle": {
    opacity: 0.1,
    cursor: "pointer"
  },
  "& circle:hover": {
    opacity: 0.6
  }
})

export default ({ state: { tree, ui }, changeTree }) => {
  const { width, height } = getContainerDimensions(ui)
  return (
    <Container>
      <svg id="splyt-editor" viewBox={`0 0 ${width} ${height}`}>
        <g
          transform={`translate(${width / 2} ${height *
            9 /
            10}) rotate(${180})`}
        >
          <Units state={tree} setState={changeTree} />
        </g>
      </svg>
    </Container>
  )
}
