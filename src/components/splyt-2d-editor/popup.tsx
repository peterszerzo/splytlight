import React from "react";
import styled from "@emotion/styled";

import Icon from "../icon";
import * as uiKit from "../ui-kit";
import * as styles from "../../styles";
import * as splyt from "../../splyt";

export interface Props {
  size: splyt.Size;
  onSizeChange: (newSize: splyt.Size) => void;
  rotation: number;
  onRotationChange?: (newRotation: number) => void;
}

const PopupContainer = styled.div({
  position: "absolute",
  bottom: 20,
  left: "calc(50% - 120px)",
  width: 260,
  height: 140,
  alignItems: "center",
  justifyContent: "space-between",
  display: "flex",
  padding: 10,
  backgroundColor: styles.white,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: 6
});

const IconButton = styled.button({
  width: 60,
  height: 60,
  border: 0,
  borderRadius: "50%",
  backgroundColor: styles.blue,
  color: styles.white,
  ":hover": {
    backgroundColor: styles.lighterBlue
  },
  ":focus": {
    outline: "none",
    boxShadow: `0 0 0 3px ${styles.faintBlue}`
  }
});

const PopupSection = styled.div({
  width: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const Popup: React.SFC<Props> = props => (
  <PopupContainer>
    <PopupSection>
      <IconButton
        onClick={() => {
          props.onSizeChange(props.size === "small" ? "large" : "small");
        }}
        title="Change size"
      >
        <Icon id={props.size === "small" ? "smallSplyt" : "largeSplyt"} />
      </IconButton>
    </PopupSection>
    <PopupSection>
      <uiKit.Rotator
        rotation={props.rotation}
        onChange={
          props.onRotationChange &&
          (newRotation => {
            props.onRotationChange && props.onRotationChange(newRotation);
          })
        }
      />
    </PopupSection>
  </PopupContainer>
);

export default Popup;
