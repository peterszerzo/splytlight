import React from "react"
import { css } from "glamor"
import Icon from "./icon"
import * as vars from "../styles/vars"

const rootClass = css({
  position: "relative",
  textDecoration: "none",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  borderRadius: "20px",
  textAlign: "center",
  margin: "10px 0",
  background: vars.blue,
  color: vars.white,
  boxShadow: "0 0 12px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .2)",
  display: "flex",
  alignItems: "center",
  fill: vars.white,
  justifyContent: "center",
  padding: "8px",
  opacity: "0.95",
  transition: "opacity .3s",
  ":hover": {
    opacity: "1"
  },
  ":focus": {
    outline: 0
  }
})

export default ({ icon, onClick, title }) => {
  const child = <Icon id={icon} />
    return (
      <button className={rootClass} title={title} onClick={onClick}>
        {child}
      </button>
    )
}
