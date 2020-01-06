import React from "react";
import styled from "@emotion/styled";

import * as uiKit from "../ui-kit";
import * as styles from "../../styles";
import * as splyt from "../../splyt";

export interface Props {
  size: splyt.Size;
  onSizeChange: (newSize: splyt.Size) => void;
  rotation: number;
  onRotationChange?: (newRotation: number) => void;
}

interface PartIconProps {
  size: splyt.Size;
  onClick?: () => void;
  isInactive?: boolean;
}

const PartIcon: React.SFC<PartIconProps> = props => {
  const {
    left: { x: xl, y: yl },
    right: { x: xr, y: yr },
    mid: { x: xm, y: ym },
    start: { x: x0, y: y0 }
  } = splyt.getPoints(splyt.part(props.size), { useOffset: true });
  const height = (yl + yr) / 2;
  return (
    <svg viewBox="0 0 160 160">
      <g
        transform={`translate(80 ${80 - height / 2})`}
        stroke="currentColor"
        fill="none"
        strokeWidth="12"
      >
        <line x1={x0} y1={y0} x2={xm} y2={ym} />
        <line x1={xm} y1={ym} x2={xl} y2={yl} />
        <line x1={xm} y1={ym} x2={xr} y2={yr} />
      </g>
    </svg>
  );
};

const PopupContainer = styled.div({
  position: "absolute",
  bottom: 20,
  left: "calc(50% - 120px)",
  width: 280,
  height: 120,
  alignItems: "center",
  justifyContent: "space-between",
  display: "flex",
  padding: 10,
  backgroundColor: styles.white,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: 6
});

const IconButton = styled.button<{ isActive: boolean }>(({ isActive }) => ({
  width: 40,
  height: 40,
  border: 0,
  borderRadius: "50%",
  margin: 0,
  padding: 0,
  cursor: "pointer",
  ...(isActive
    ? {
        color: styles.blue
      }
    : { color: styles.gray }),
  ":hover": {
    color: styles.darkerBlue
  },
  ":focus": {
    outline: "none"
  }
}));

const PopupSection = styled.div({
  width: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const allSizes: splyt.Size[] = ["small", "large"];

const Popup: React.SFC<Props> = props => (
  <PopupContainer>
    <PopupSection>
      <div>
        {allSizes.map((size, index) => (
          <IconButton
            key={index}
            isActive={size === props.size}
            onClick={() => {
              props.onSizeChange(size);
            }}
            title="Change size"
          >
            <PartIcon size={size} />
          </IconButton>
        ))}
      </div>
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
