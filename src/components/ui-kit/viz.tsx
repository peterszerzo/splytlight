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
}

const VizContainer = styled.div({
  position: "relative",
  height: "100%"
});

const VizCover = styled.div({
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

const VizCoverContent = styled.div({
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

const Viz: React.SFC<Props> = props => {
  const { overlay, children, ...rest } = props;
  return (
    <VizContainer {...rest}>
      {props.overlay && (
        <VizCover>
          <VizCoverContent>
            <p>{props.overlay.body}</p>
            <Button onClick={props.overlay.action.onPress}>
              {props.overlay.action.label}
            </Button>
          </VizCoverContent>
        </VizCover>
      )}
      {children}
    </VizContainer>
  );
};

export default Viz;
