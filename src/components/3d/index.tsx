import React, { Component } from "react";
import createThreeApp from "./three-app";
import mouseDragContainer from "./mouse-drag-container";

class ThreeDee extends Component<any, any> {
  render() {
    const props = this.props as any;
    return (
      <div
        ref={this.setContainerNode.bind(this)}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onMouseMove={props.onMouseMove}
        onMouseOut={props.onMouseOut}
      />
    );
  }

  containerNode: any = null;
  threeApp: any = null;

  setContainerNode(node: any) {
    this.containerNode = node;
  }

  componentDidMount() {
    this.threeApp = createThreeApp(this.containerNode, {
      global: this.props.state,
      drag: this.props.drag
    });
  }

  componentDidUpdate() {
    this.threeApp.update({
      global: this.props.state,
      drag: this.props.drag
    });
  }
}

export default mouseDragContainer(ThreeDee as any);
