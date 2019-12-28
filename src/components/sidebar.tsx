import React from "react";
import styled from "@emotion/styled";

const Container = styled.div({
  textAlign: "center",
  padding: 10,
  "& > *": {
    marginBottom: 10
  }
});

const Sidebar: React.SFC<{}> = props => <Container>{props.children}</Container>;

export default Sidebar;
