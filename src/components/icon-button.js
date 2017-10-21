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
  opacity: "0.7",
  transition: "opacity .3s",
  ":hover": {
    opacity: "1"
  }
})

const uploadInputClass = css({
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1"
})

const uploadLabelClass = css({
  cursor: "pointer",
  width: "100%",
  height: "100%"
})

export default ({ icon, onClick, onUpload, uploadId, href, title }) => {
  const child = <Icon id={icon} />
  if (href) {
    return (
      <a className={rootClass} title={title} href={href}>
        {child}
      </a>
    )
  }
  if (onClick) {
    return (
      <button className={rootClass} title={title} onClick={onClick}>
        {child}
      </button>
    )
  }
  if (onUpload) {
    return (
      <div className={rootClass}>
        <input
          id={uploadId}
          className={uploadInputClass}
          type={"file"}
          onChange={e => {
            const file = e.target.files[0]
            const reader = new global.FileReader()
            reader.onload = e => {
              onUpload(e.target.result)
            }
            reader.readAsText(file)
          }}
        />
        <label htmlFor={uploadId} className={uploadLabelClass}>
          {child}
        </label>
      </div>
    )
  }
  return null
}
