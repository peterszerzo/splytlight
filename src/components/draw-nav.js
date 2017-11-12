import React from "react"
import glamorous from "glamorous"
import Button from "./button"

const Container = glamorous.div({
  position: "absolute",
  top: "40px",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "40px"
})

export default ({ state, setState }) => (
  <Container>
    <Button
      icon={state.currentSize + "Splyt"}
      title={`Set Splyt unit size | current: ${state.currentSize}`}
      onClick={() => {
        setState({
          currentSize: state.currentSize === "small" ? "large" : "small"
        })
      }}
    />
  </Container>
)
