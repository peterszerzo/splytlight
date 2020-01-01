import styled from "@emotion/styled";

import * as styles from "../../styles";

const Input = styled.input({
  fontSize: "1rem",
  border: `1px solid ${styles.lightGray}`,
  padding: "4px 8px",
  borderRadius: 6,
  "&:focus": {
    outline: "none",
    borderColor: styles.blue,
    boxShadow: `0 0 0 3px ${styles.faintBlue}`
  }
});

export default Input;
