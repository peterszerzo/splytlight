import React from "react";
import styled from "@emotion/styled";

import * as styles from "../styles";
export interface Props {
  icon: "save" | "image" | "rotateCw" | "rotateCcw";
  onPress?: () => void;
  primary?: boolean;
  title: string;
}

const Container = styled.button<{ disabled?: boolean; primary?: boolean }>(
  ({ disabled, primary }) => ({
    display: "inline-block",
    width: 36,
    height: 36,
    padding: 8,
    border: 0,
    borderRadius: "50%",
    ...(primary
      ? {
          backgroundColor: styles.blue,
          color: styles.white,
          ...(disabled
            ? {}
            : {
                ":hover": {
                  backgroundColor: styles.lighterBlue
                },
                ":focus": {
                  outline: "none",
                  boxShadow: `0 0 0 3px ${styles.faintBlue}`
                }
              })
        }
      : {
          color: styles.gray,
          ...(disabled
            ? {}
            : {
                ":hover": {
                  backgroundColor: styles.faintGray
                },
                ":focus": {
                  outline: "none",
                  boxShadow: `0 0 0 3px ${styles.lightGray}`
                }
              })
        }),
    opacity: disabled ? 0.4 : 1
  })
);

const IconButton: React.SFC<Props> = props => (
  <Container
    title={props.title}
    primary={props.primary}
    disabled={!props.onPress}
    onClick={props.onPress}
  >
    {(() => {
      if (props.icon === "save") {
        return save;
      }
      if (props.icon === "image") {
        return image;
      }
      if (props.icon === "rotateCw") {
        return rotateCw;
      }
      if (props.icon === "rotateCcw") {
        return rotateCcw;
      }
    })()}
  </Container>
);

const rotateCcw = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

const rotateCw = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
  </svg>
);

const image = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const save = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);
export default IconButton;
