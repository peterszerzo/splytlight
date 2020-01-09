import React from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";
import Button from "./button";

interface Props {
  overlay?: {
    body: string;
    action: {
      label: string;
      onPress: () => void;
    };
  };
  controls?: React.ReactNode;
}

const Container = styled.div({
  position: "relative",
  userSelect: "none",
  height: "100%",
  overflow: "hidden",
});

const Cover = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const CoverContent = styled.div({
  textAlign: "center",
  width: "fit-content",
  padding: 20,
  maxWidth: 280,
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  backgroundColor: styles.white,
  borderRadius: 6,
  "& p": {
    margin: "0 0 10px 0"
  }
});

const ControlsContainer = styled.div({
  position: "absolute",
  zIndex: 1001,
  top: 14,
  left: 14
});

const Viz: React.SFC<Props> = props => {
  const { overlay, children, ...rest } = props;
  return (
    <Container {...rest}>
      {props.overlay && (
        <Cover>
          <CoverContent>
            <p>{props.overlay.body}</p>
            <Button onClick={props.overlay.action.onPress}>
              {props.overlay.action.label}
            </Button>
          </CoverContent>
        </Cover>
      )}
      {props.controls && (
        <ControlsContainer>{props.controls}</ControlsContainer>
      )}
      {children}
    </Container>
  );
};

export default Viz;
