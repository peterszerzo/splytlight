import styled from "@emotion/styled";
import * as styles from "../../styles";

const Button = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  backgroundColor: styles.blue,
  color: styles.white,
  borderRadius: 20,
  fontSize: "1em",
  border: 0,
  display: "inline-block",
  padding: "6px 18px",
  opacity: disabled ? 0.2 : 1,
  ":focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${styles.faintBlue}`
  },
  ":hover": {
    backgroundColor: styles.lighterBlue
  }
}));

export default Button;
