import React from "react";
import marked from "marked";
import styled from "@emotion/styled";

const Container = styled.div({
  "& a": {
    textDecoration: "none",
    color: "currentColor",
    borderBottom: "1px solid currentColor"
  }
});

export default ({ content }: any) => (
  <Container dangerouslySetInnerHTML={{ __html: marked(content) }} />
);
