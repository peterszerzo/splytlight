import styled from "@emotion/styled";

import * as styles from "../../styles";

const Grid = styled.main({
  display: "grid",
  height: `calc(100% - ${styles.headerHeight}px)`,
  gridTemplateColumns: `${styles.sidebarWidth}px 1fr`,
  gridTemplateRows: "1fr 1fr",
  gridTemplateAreas: `
  "a b"
  "a c"
  `,
  "& > *": {
    borderColor: styles.lightGray
  },
  "& > *:nth-of-type(1)": {
    gridArea: "a",
    borderWidth: "0 1px 0 0",
    borderRight: `1px solid ${styles.lightGray}`
  },
  "& > *:nth-of-type(2)": {
    gridArea: "b",
    borderWidth: "0 0 1px 0",
    borderBottom: `1px solid ${styles.lightGray}`
  },
  "& > *:nth-of-type(3)": {
    gridArea: "c",
    borderWidth: "0 0 0 0"
  },
  "@media (min-width: 600px)": {
    gridTemplateColumns: `${styles.sidebarWidth}px 1fr 1fr`,
    gridTemplateRows: "1fr",
    gridTemplateAreas: `
    "a b c"
    `,
    "& > *:nth-of-type(1)": {
      gridArea: "a"
    },
    "& > *:nth-of-type(2)": {
      gridArea: "b",
      borderRight: `1px solid ${styles.lightGray}`,
      borderBottom: "0"
    },
    "& > *:nth-of-type(3)": {
      gridArea: "c"
    },
    height: `calc(100% - ${styles.headerHeight}px)`
  }
});

export default Grid;
