import React from "react"
import marked from "marked"
import glamorous from "glamorous"

const Div = glamorous.div({
  "& a": {
    textDecoration: "none",
    color: "currentColor",
    borderBottom: "1px solid currentColor"
  }
})

export default ({ content }) => (
  <Div dangerouslySetInnerHTML={{ __html: marked(content) }} />
)
