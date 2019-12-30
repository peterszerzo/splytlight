import styled from "@emotion/styled";

import * as styles from "../../styles";

const Grid = styled.main({
  display: "grid",
  gridTemplateColumns: `${styles.sidebarWidth}px 1fr 1fr`,
  gridTemplateRows: "1fr",
  height: `calc(100% - ${styles.headerHeight}px)`,
  "& > *:not(:last-child)": {
    borderRight: `1px solid ${styles.lightGray}`
  }
});

export default Grid;
