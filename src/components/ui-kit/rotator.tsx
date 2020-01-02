import React from "react";
import styled from "@emotion/styled";
import range from "ramda/src/range";

import * as styles from "../../styles";

interface Props {
  rotation: number;
  onChange?: (newRotation: number) => void;
}

const s = 120;

const Container = styled.div<{ isDisabled: boolean }>(({ isDisabled }) => ({
  width: s,
  height: s,
  backgroundColor: "#F4F4F4",
  borderRadius: "50%",
  opacity: isDisabled ? 0.6 : 1,
  position: "relative"
}));

const GridPin = styled.div<{ isDisabled: boolean }>(({ isDisabled }) => ({
  position: "absolute",
  width: 8,
  height: 8,
  borderRadius: "50%",
  transform: "translate3d(-4px, -4px, 0)",
  backgroundColor: styles.lightGray,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: styles.gray
  }
}));

const Pin = styled.div<{ isDisabled: boolean }>(({ isDisabled }) => ({
  position: "absolute",
  width: 12,
  height: 12,
  borderRadius: "50%",
  transform: "translate3d(-6px, -6px, 0)",
  backgroundColor: isDisabled ? styles.gray : styles.blue
}));

const Rotator: React.SFC<Props> = props => {
  return (
    <Container isDisabled={!props.onChange}>
      {range(0, 16).map((val, index) => {
        const fract = val / 16;
        const angle = Math.PI * 2 * fract;
        return (
          <GridPin
            onClick={() => {
              props.onChange && props.onChange(angle);
            }}
            style={{
              top: s * (0.5 - 0.4 * Math.cos(angle)),
              left: s * (0.5 - 0.4 * Math.sin(angle))
            }}
            isDisabled={!props.onChange}
            key={index}
          />
        );
      })}
      <Pin
        isDisabled={!props.onChange}
        style={{
          top: s * (0.5 - 0.4 * Math.cos(props.rotation)),
          left: s * (0.5 - 0.4 * Math.sin(props.rotation))
        }}
      />
    </Container>
  );
};

export default Rotator;
