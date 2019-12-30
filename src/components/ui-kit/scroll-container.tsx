import styled from "@emotion/styled";

import * as styles from "../../styles";

const ScrollContainer = styled.div({
  height: `calc(100vh - ${styles.headerHeight}px)`,
  overflow: "auto",
  position: "relative",
  paddingBottom: 50,
  "&::-webkit-scrollbar": {
    display: "none"
  },
  "&::after": {
    content: "' '",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
  }
});

export default ScrollContainer;
