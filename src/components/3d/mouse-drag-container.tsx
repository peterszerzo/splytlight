import { Component, createElement } from "react";

export default (Comp: Component<any, any>) =>
  class DragContainer extends Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        atDragStart: null,
        current: [0, 0],
        totalFinalizedDrag: [0, 0]
      };
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
    }

    render() {
      return createElement(
        Comp as any,
        Object.assign({}, this.props, {
          drag: {
            current: this.state.current,
            totalFinalized: this.state.totalFinalizedDrag
          },
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          onMouseMove: this.onMouseMove,
          onMouseOut: this.onMouseUp
        })
      );
    }

    onMouseUp() {
      const { totalFinalizedDrag, current, atDragStart } = this.state as any;
      if (!atDragStart || !current) {
        return this.setState({
          atDragStart: null,
          current: [0, 0]
        });
      }
      this.setState({
        atDragStart: null,
        current: [0, 0],
        totalFinalizedDrag: [
          totalFinalizedDrag[0] + current[0],
          totalFinalizedDrag[1] + current[1]
        ]
      });
    }

    onMouseMove(ev: any) {
      const { atDragStart } = this.state;
      if (!atDragStart) {
        return;
      }
      this.setState({
        current: [
          ev.nativeEvent.offsetX - atDragStart[0],
          ev.nativeEvent.offsetY - atDragStart[1]
        ]
      });
    }

    onMouseDown(ev: any) {
      this.setState({
        atDragStart: [ev.nativeEvent.offsetX, ev.nativeEvent.offsetY],
        current: [0, 0]
      });
    }
  };
