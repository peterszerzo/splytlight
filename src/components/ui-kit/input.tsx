import styled from "@emotion/styled";

import * as styles from "../../styles";

const Input = styled.input({
  fontSize: "1rem",
  border: 0,
  padding: "4px 8px",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: styles.faintGray,
  },
  "&:focus": {
    outline: "none",
    border: `1px solid ${styles.lightGray}`
  }
});

export default Input;
