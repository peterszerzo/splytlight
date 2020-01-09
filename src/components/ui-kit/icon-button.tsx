import React from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";

export interface Props {
  icon: "save" | "image" | "rotateCw" | "rotateCcw" | "zoomIn" | "zoomOut";
  desktopOnly?: boolean;
  onPress?: () => void;
  primary?: boolean;
  title: string;
}

const Container = styled.button<{
  desktopOnly?: boolean;
  disabled?: boolean;
  primary?: boolean;
}>(({ desktopOnly, disabled, primary }) => ({
  width: 36,
  height: 36,
  padding: 8,
  border: 0,
  borderRadius: "50%",
  ...(desktopOnly
    ? {
        display: "none",
        "@media (min-width: 600px)": {
          display: "inline-block"
        }
      }
    : {
        display: "inline-block"
      }),
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
        color: styles.black,
        backgroundColor: styles.white,
        ...(disabled
          ? {}
          : {
              ":hover": {
                backgroundColor: styles.faintGray
              },
              ":focus": {
                outline: "none",
                boxShadow: `0 0 0 3px ${styles.faintGray}`
              }
            })
      }),
  opacity: disabled ? 0.3 : 1
}));

const IconButton: React.SFC<Props> = props => (
  <Container
    title={props.title}
    primary={props.primary}
    disabled={!props.onPress}
    desktopOnly={props.desktopOnly}
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
      if (props.icon === "zoomIn") {
        return zoomIn;
      }
      if (props.icon === "zoomOut") {
        return zoomOut;
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

const zoomIn = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const zoomOut = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

export default IconButton;
