import React from "react";
import marked from "marked";
import styled from "@emotion/styled";

interface Props {
  content: string;
}

const Container = styled.div({
  "& a": {
    textDecoration: "none",
    color: "currentColor",
    borderBottom: "1px solid currentColor"
  }
});

const Static: React.SFC<Props> = props => {
  const { content, ...rest } = props;
  return (
    <Container
      {...rest}
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  );
};

export default Static;
